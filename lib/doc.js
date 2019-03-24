'use strict';

const assert = require('assert');

class Doc {
  constructor({ client }) {
    this.client = client;
  }
  /**
   * list docs of a repo
   * @param {Object} args - params
   * @param {String} args.namespace - repos namespace or id
   * @return {Array<DocDetail>} return docs
   */
  async list({ namespace }) {
    assert(namespace, 'repo namespace or id is required');
    return this.client.request(`repos/${namespace}/docs`, { method: 'GET' });
  }

  /**
   * get detail info of a doc
   * @param {Object} args - params
   * @param {String} args.namespace - repos namespace or id
   * @param {String} args.slug - doc slug or id
   * @param {Object} [data] - query
   * @param {Number} [data.raw] - pass `1` will return markdown body
   * @return {DocDetail} - return specified doc
   */
  async get({ namespace, slug, data }) {
    assert(namespace, 'repo namespace or id is required');
    assert(slug, 'doc slug or id is required');
    return this.client.request(`repos/${namespace}/docs/${slug}`, { method: 'GET', data });
  }

  /**
   * create doc
   * @param {Object} args - params
   * @param {String} args.namespace - repos namespace or id
   * @param {Object} data - doc info
   * @param {String} data.title - doc title
   * @param {String} data.slug - doc slug
   * @param {Number} [data.public] - `0` as private doc, `1` as public doc
   * @param {String} [data.format] - doc type, support `markdown`(default) and `lake`
   * @param {String} [data.body] - doc content, max size is 5MB
   * @return {DocDetail} - return specified doc
   */
  async create({ namespace, data }) {
    assert(namespace, 'repo namespace or id is required');
    return this.client.request(`repos/${namespace}/docs`, { method: 'POST', data });
  }

  /**
   * update doc
   * @param {Object} args - params
   * @param {String} args.namespace - repos namespace or id
   * @param {String} args.id - doc id, NOT `slug`
   * @param {Object} data - doc info
   * @param {String} [data.title] - doc title
   * @param {String} [data.slug] - doc slug
   * @param {Number} [data.public] - `0` as private doc, `1` as public doc
   * @param {String} [data.body] - doc content, markdown, max size is 5MB
   * @return {DocDetail} - return specified doc
   */
  async update({ namespace, id, data }) {
    assert(namespace, 'repo namespace or id is required');
    assert(id, 'doc id is required');
    return this.client.request(`repos/${namespace}/docs/${id}`, { method: 'PUT', data });
  }

  /**
   * delete doc
   * @param {Object} args - params
   * @param {String} args.namespace - repos namespace or id
   * @param {String} args.id - doc id, NOT `slug`
   * @return {DocDetail} - return specified doc
   */
  async delete({ namespace, id }) {
    assert(namespace, 'repo namespace or id is required');
    assert(id, 'doc id is required');
    return this.client.request(`repos/${namespace}/docs/${id}`, { method: 'DELETE' });
  }
}

module.exports = Doc;
