'use strict';

// THIS IS THE STRETCH GOAL ...
// It takes in a schema in the constructor and uses that instead of every collection
// being the same and requiring their own schema. That's not very DRY!

class Collection {

  constructor(model) {
    this.model = model;
  }
  async create(json) {
    try {
      let record = await this.model.create(json);
      return record;
    } catch (err) {
      return err;
    }
  }

  async read(id, options = {}) {
    try {
      let records = null;
      if (id) {
        options['where'] = { id };
        records = await this.model.findOne(options);
      } else {
        records = await this.model.findAll(options);
      }
      return records;
    } catch (err) {
      return err;
    }
  }

  async update(id, json) {
    try {
      let record = await this.model.findOne({ where: { id } });
      let updatedRecord = await record.update(json);

      return updatedRecord;
    } catch (err) {
      return err;
    }
  }

  async delete(id) {
    try {
      let deletedRows = await this.model.destroy({ where: { id } });
      return deletedRows;
    } catch (err) {
      return err;
    }
  }
  // get(id) {
  //   if (id) {
  //     return this.model.findOne({ id });
  //   }
  //   else {
  //     return this.model.findAll({});
  //   }
  // }

  // create(record) {
  //   return this.model.create(record);
  // }

  // update(id, data) {
  //   return this.model.findOne({ where: { id } })
  //     .then(record => record.update(data));
  // }

  // delete(id) {
  //   return this.model.destroy({ where: { id } });
  // }

}

module.exports = Collection;

// -------------------------- //
