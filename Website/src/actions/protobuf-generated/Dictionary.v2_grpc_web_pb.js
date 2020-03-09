/**
 * @fileoverview gRPC-Web generated client stub for Dictionary.v2
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.Dictionary = {};
proto.Dictionary.v2 = require('./Dictionary.v2_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.Dictionary.v2.DictionaryProviderClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.Dictionary.v2.DictionaryProviderPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Dictionary.v2.GetWordsRequest,
 *   !proto.Dictionary.v2.WordsReply>}
 */
const methodDescriptor_DictionaryProvider_GetWords = new grpc.web.MethodDescriptor(
  '/Dictionary.v2.DictionaryProvider/GetWords',
  grpc.web.MethodType.UNARY,
  proto.Dictionary.v2.GetWordsRequest,
  proto.Dictionary.v2.WordsReply,
  /**
   * @param {!proto.Dictionary.v2.GetWordsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Dictionary.v2.WordsReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Dictionary.v2.GetWordsRequest,
 *   !proto.Dictionary.v2.WordsReply>}
 */
const methodInfo_DictionaryProvider_GetWords = new grpc.web.AbstractClientBase.MethodInfo(
  proto.Dictionary.v2.WordsReply,
  /**
   * @param {!proto.Dictionary.v2.GetWordsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Dictionary.v2.WordsReply.deserializeBinary
);


/**
 * @param {!proto.Dictionary.v2.GetWordsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Dictionary.v2.WordsReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Dictionary.v2.WordsReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.Dictionary.v2.DictionaryProviderClient.prototype.getWords =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/Dictionary.v2.DictionaryProvider/GetWords',
      request,
      metadata || {},
      methodDescriptor_DictionaryProvider_GetWords,
      callback);
};


/**
 * @param {!proto.Dictionary.v2.GetWordsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Dictionary.v2.WordsReply>}
 *     A native promise that resolves to the response
 */
proto.Dictionary.v2.DictionaryProviderPromiseClient.prototype.getWords =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/Dictionary.v2.DictionaryProvider/GetWords',
      request,
      metadata || {},
      methodDescriptor_DictionaryProvider_GetWords);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Dictionary.v2.AddWordsRequest,
 *   !proto.Dictionary.v2.AddWordsReply>}
 */
const methodDescriptor_DictionaryProvider_AddWords = new grpc.web.MethodDescriptor(
  '/Dictionary.v2.DictionaryProvider/AddWords',
  grpc.web.MethodType.UNARY,
  proto.Dictionary.v2.AddWordsRequest,
  proto.Dictionary.v2.AddWordsReply,
  /**
   * @param {!proto.Dictionary.v2.AddWordsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Dictionary.v2.AddWordsReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.Dictionary.v2.AddWordsRequest,
 *   !proto.Dictionary.v2.AddWordsReply>}
 */
const methodInfo_DictionaryProvider_AddWords = new grpc.web.AbstractClientBase.MethodInfo(
  proto.Dictionary.v2.AddWordsReply,
  /**
   * @param {!proto.Dictionary.v2.AddWordsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Dictionary.v2.AddWordsReply.deserializeBinary
);


/**
 * @param {!proto.Dictionary.v2.AddWordsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.Dictionary.v2.AddWordsReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Dictionary.v2.AddWordsReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.Dictionary.v2.DictionaryProviderClient.prototype.addWords =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/Dictionary.v2.DictionaryProvider/AddWords',
      request,
      metadata || {},
      methodDescriptor_DictionaryProvider_AddWords,
      callback);
};


/**
 * @param {!proto.Dictionary.v2.AddWordsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Dictionary.v2.AddWordsReply>}
 *     A native promise that resolves to the response
 */
proto.Dictionary.v2.DictionaryProviderPromiseClient.prototype.addWords =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/Dictionary.v2.DictionaryProvider/AddWords',
      request,
      metadata || {},
      methodDescriptor_DictionaryProvider_AddWords);
};


module.exports = proto.Dictionary.v2;

