import EventEmitter from 'events'

const getNextId = (() => {
  let id = 0
  return () => ++id
})();

const CHANGE_EVENT = 'change'
const DELETE_EVENT = 'delete'

class Document extends EventEmitter {
  body = {}
  constructor(id) {
    super();
    this.id = id;
  }
  async mutate(data) {
    this.body = data;
    this.emit(CHANGE_EVENT, this.id);
  }
  async merge(data) {
    Object.assign(this.body, data);
    this.emit(CHANGE_EVENT, this.id);
  }
  async delete(data) {
    this.emit(DELETE_EVENT, this.id);
  }
}

class Collection extends EventEmitter {
  documents = {}
  constructor(name) {
    super();
    this.name = name;
  }
  newDocument() {
    const id = getNextId()
    const document = new Document(id)

    document.on(CHANGE_EVENT, () => {
      this.emit('change')
    })

    document.on(DELETE_EVENT, () => {
      delete this.documents[id]
      this.emit('change')
    })

    this.documents[id] = document

    return document
  }
  document(id) {
    return this.documents[id]
  }
  filter(clause) {
    const results = [];

    outer: for (let id in this.documents) {
      const document = this.documents[id];
      for (let key in clause) {
        if (document.body[key] !== clause[key]) {
          continue outer;
        }
      }
      results.push(document);
    }

    return results;
  }
}

class CollectionView {
  constructor(collection, clause) {
    this.collection = collection
    this.clause = clause
  }
  subscribe(fn) {
    // Delay invocation for same behavior as real API
    const handleChange = () => setTimeout(() => {
      const documents = this.collection.filter(this.clause)
      fn(documents)
    });

    handleChange();

    this.collection.on(CHANGE_EVENT, handleChange);

    return {
      unsubscribe: () => {
        this.collection.removeListener(CHANGE_EVENT, handleChange)
      }
    };
  }
  filter(clause) {
    this.clause = clause
    return this
  }
  newDocument() {
    return this.collection.newDocument()
  }
  document(id) {
    return this.collection.document(id)
  }
}

class Client {
  collections = {}
  collection(name) {
    if (!this.collections[name]) {
      this.collections[name] = new Collection(name);
    }

    let collection = this.collections[name];

    return new CollectionView(collection, {});
  }
}

function createClient() {
  const client = new Client();
  populateClient(client);
  return client;
}

export default {
  createClient,
}

function populateClient(client) {
  const pages = [
    { id: "getting-started", title: "Getting Started", isGroup: true },
    { id: "initializing-client", title: "Initializing Client", isGroup: false },
    { id: "referencing-documents", title: "Referencing Documents", isGroup: false },
    { id: "subscribing-to-data", title: "Subscribing to Data", isGroup: false },
    { id: "1", title: "Reading Data", isGroup: true },
    { id: "2", title: "Subscriptions", isGroup: false },
    { id: "3", title: "Filtering", isGroup: false },
    { id: "4", title: "Ordering", isGroup: false },
    { id: "5", title: "Paging", isGroup: false },
    { id: "6", title: "Fetch", isGroup: false },
    { id: "7", title: "Writing Data", isGroup: true },
    { id: "8", title: "Mutate", isGroup: false },
    { id: "9", title: "Merge", isGroup: false },
    { id: "10", title: "Delete", isGroup: false }
  ];

  const documents = [{
    pageId: 'initializing-client',
    content: `## Importing the Rapid.io Library

An API key is required to create a Rapid.io client. You can obtain one when creating a new project. It only serves to uniquely identify your project and it can safely be distributed as part of your client-side code.

${'```'}js
// import Rapid.io library
import rapid from 'rapid-io'

// connect with your API key
const rapidClient = rapid.createClient('<API KEY>')
${'```'}`
  }, {
    pageId: 'initializing-client',
    content: `## Referencing Documents

Similar to many NoSQL databases Rapid.io represents data in a form of collections and documents. Documents are stored as a schema-less JSON objects. All properties of all documents are automatically indexed so queries are always efficient.`
  }, {
    pageId: 'initializing-client',
    content: `## Subscribing To Data

The power of Rapid.io lies in subscriptions. Subscriptions allow the developer to fetch a subset of a collection and get notified every time the data changes. Any underlying connection scenarios are handled automatically including temporary network connection loss, the user sending a mobile app to background etc. Rapid.io will update you with the latest dataset immediately after the connection is reestablished.

${'```'}js
// subscribe to all to-dos with 'priority' parameter set to 'high'
rapidClient
  .collection('my-todo-list')
  .filter({ priority: 'high' }) // filter by a 'priority' parameter
  .subscribe(toDos => {
    // this will be called once and then every time a document is
    // added, updated or removed from a subset
    // TODO: update user interface
    console.log(toDos)
  })
  ${'```'}`
  }];

  client
    .collection('pages')
    .newDocument()
    .merge({ pages });

  documents.map(body => {
    client
      .collection('blocks')
      .newDocument()
      .mutate(body);
  });
}
