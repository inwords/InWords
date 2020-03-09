/**
 * @fileoverview gRPC-Web generated client stub for WordSet.v2
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var Dictionary_v2_pb = require('./Dictionary.v2_pb.js')
const proto = {};
proto.WordSet = {};
proto.WordSet.v2 = require('./WordSet.v2_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.WordSet.v2.WordSetProviderClient =
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
proto.WordSet.v2.WordSetProviderPromiseClient =
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
 *   !proto.WordSet.v2.WordSetWordsRequest,
 *   !proto.WordSet.v2.WordSetWordsReply>}
 */
const methodDescriptor_WordSetProvider_GetWordsList = new grpc.web.MethodDescriptor(
  '/WordSet.v2.WordSetProvider/GetWordsList',
  grpc.web.MethodType.UNARY,
  proto.WordSet.v2.WordSetWordsRequest,
  proto.WordSet.v2.WordSetWordsReply,
  /**
   * @param {!proto.WordSet.v2.WordSetWordsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.WordSet.v2.WordSetWordsReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.WordSet.v2.WordSetWordsRequest,
 *   !proto.WordSet.v2.WordSetWordsReply>}
 */
const methodInfo_WordSetProvider_GetWordsList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.WordSet.v2.WordSetWordsReply,
  /**
   * @param {!proto.WordSet.v2.WordSetWordsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.WordSet.v2.WordSetWordsReply.deserializeBinary
);


/**
 * @param {!proto.WordSet.v2.WordSetWordsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.WordSet.v2.WordSetWordsReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.WordSet.v2.WordSetWordsReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.WordSet.v2.WordSetProviderClient.prototype.getWordsList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/WordSet.v2.WordSetProvider/GetWordsList',
      request,
      metadata || {},
      methodDescriptor_WordSetProvider_GetWordsList,
      callback);
};


/**
 * @param {!proto.WordSet.v2.WordSetWordsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.WordSet.v2.WordSetWordsReply>}
 *     A native promise that resolves to the response
 */
proto.WordSet.v2.WordSetProviderPromiseClient.prototype.getWordsList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/WordSet.v2.WordSetProvider/GetWordsList',
      request,
      metadata || {},
      methodDescriptor_WordSetProvider_GetWordsList);
};


module.exports = proto.WordSet.v2;

