const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
    it('creates a new item and visits it', async () => {
      const newItem = await seedItemToDatabase();

      const response = await request(app)
        .get('/items/' + newItem._id);
  
      // const createdItem = await Item.findOne(itemToCreate);
      const title = parseTextFromHTML(response.text, '#item-title');
      const description = parseTextFromHTML(response.text, '#item-description');

      assert.include(title, newItem.title);
      assert.include(description, newItem.description);
 
    });
  });
  
});
