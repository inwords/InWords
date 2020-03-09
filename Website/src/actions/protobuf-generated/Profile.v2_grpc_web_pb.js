/**
 * @fileoverview gRPC-Web generated client stub for ProfilePackage.v2
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.ProfilePackage = {};
proto.ProfilePackage.v2 = require('./Profile.v2_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.ProfilePackage.v2.ProfileClient =
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
proto.ProfilePackage.v2.ProfilePromiseClient =
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
 *   !proto.ProfilePackage.v2.RegistrationRequest,
 *   !proto.ProfilePackage.v2.RegistrationReply>}
 */
const methodDescriptor_Profile_Register = new grpc.web.MethodDescriptor(
  '/ProfilePackage.v2.Profile/Register',
  grpc.web.MethodType.UNARY,
  proto.ProfilePackage.v2.RegistrationRequest,
  proto.ProfilePackage.v2.RegistrationReply,
  /**
   * @param {!proto.ProfilePackage.v2.RegistrationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ProfilePackage.v2.RegistrationReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ProfilePackage.v2.RegistrationRequest,
 *   !proto.ProfilePackage.v2.RegistrationReply>}
 */
const methodInfo_Profile_Register = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ProfilePackage.v2.RegistrationReply,
  /**
   * @param {!proto.ProfilePackage.v2.RegistrationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ProfilePackage.v2.RegistrationReply.deserializeBinary
);


/**
 * @param {!proto.ProfilePackage.v2.RegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ProfilePackage.v2.RegistrationReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ProfilePackage.v2.RegistrationReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ProfilePackage.v2.ProfileClient.prototype.register =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ProfilePackage.v2.Profile/Register',
      request,
      metadata || {},
      methodDescriptor_Profile_Register,
      callback);
};


/**
 * @param {!proto.ProfilePackage.v2.RegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ProfilePackage.v2.RegistrationReply>}
 *     A native promise that resolves to the response
 */
proto.ProfilePackage.v2.ProfilePromiseClient.prototype.register =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ProfilePackage.v2.Profile/Register',
      request,
      metadata || {},
      methodDescriptor_Profile_Register);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ProfilePackage.v2.TokenRequest,
 *   !proto.ProfilePackage.v2.TokenReply>}
 */
const methodDescriptor_Profile_GetToken = new grpc.web.MethodDescriptor(
  '/ProfilePackage.v2.Profile/GetToken',
  grpc.web.MethodType.UNARY,
  proto.ProfilePackage.v2.TokenRequest,
  proto.ProfilePackage.v2.TokenReply,
  /**
   * @param {!proto.ProfilePackage.v2.TokenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ProfilePackage.v2.TokenReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ProfilePackage.v2.TokenRequest,
 *   !proto.ProfilePackage.v2.TokenReply>}
 */
const methodInfo_Profile_GetToken = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ProfilePackage.v2.TokenReply,
  /**
   * @param {!proto.ProfilePackage.v2.TokenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ProfilePackage.v2.TokenReply.deserializeBinary
);


/**
 * @param {!proto.ProfilePackage.v2.TokenRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ProfilePackage.v2.TokenReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ProfilePackage.v2.TokenReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ProfilePackage.v2.ProfileClient.prototype.getToken =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ProfilePackage.v2.Profile/GetToken',
      request,
      metadata || {},
      methodDescriptor_Profile_GetToken,
      callback);
};


/**
 * @param {!proto.ProfilePackage.v2.TokenRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ProfilePackage.v2.TokenReply>}
 *     A native promise that resolves to the response
 */
proto.ProfilePackage.v2.ProfilePromiseClient.prototype.getToken =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ProfilePackage.v2.Profile/GetToken',
      request,
      metadata || {},
      methodDescriptor_Profile_GetToken);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ProfilePackage.v2.EmailChangeRequest,
 *   !proto.ProfilePackage.v2.EmailChangeReply>}
 */
const methodDescriptor_Profile_RequestEmailUpdate = new grpc.web.MethodDescriptor(
  '/ProfilePackage.v2.Profile/RequestEmailUpdate',
  grpc.web.MethodType.UNARY,
  proto.ProfilePackage.v2.EmailChangeRequest,
  proto.ProfilePackage.v2.EmailChangeReply,
  /**
   * @param {!proto.ProfilePackage.v2.EmailChangeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ProfilePackage.v2.EmailChangeReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ProfilePackage.v2.EmailChangeRequest,
 *   !proto.ProfilePackage.v2.EmailChangeReply>}
 */
const methodInfo_Profile_RequestEmailUpdate = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ProfilePackage.v2.EmailChangeReply,
  /**
   * @param {!proto.ProfilePackage.v2.EmailChangeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ProfilePackage.v2.EmailChangeReply.deserializeBinary
);


/**
 * @param {!proto.ProfilePackage.v2.EmailChangeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ProfilePackage.v2.EmailChangeReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ProfilePackage.v2.EmailChangeReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ProfilePackage.v2.ProfileClient.prototype.requestEmailUpdate =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ProfilePackage.v2.Profile/RequestEmailUpdate',
      request,
      metadata || {},
      methodDescriptor_Profile_RequestEmailUpdate,
      callback);
};


/**
 * @param {!proto.ProfilePackage.v2.EmailChangeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ProfilePackage.v2.EmailChangeReply>}
 *     A native promise that resolves to the response
 */
proto.ProfilePackage.v2.ProfilePromiseClient.prototype.requestEmailUpdate =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ProfilePackage.v2.Profile/RequestEmailUpdate',
      request,
      metadata || {},
      methodDescriptor_Profile_RequestEmailUpdate);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ProfilePackage.v2.ConfirmEmailRequest,
 *   !proto.ProfilePackage.v2.ConfirmEmailReply>}
 */
const methodDescriptor_Profile_ConfirmEmail = new grpc.web.MethodDescriptor(
  '/ProfilePackage.v2.Profile/ConfirmEmail',
  grpc.web.MethodType.UNARY,
  proto.ProfilePackage.v2.ConfirmEmailRequest,
  proto.ProfilePackage.v2.ConfirmEmailReply,
  /**
   * @param {!proto.ProfilePackage.v2.ConfirmEmailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ProfilePackage.v2.ConfirmEmailReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ProfilePackage.v2.ConfirmEmailRequest,
 *   !proto.ProfilePackage.v2.ConfirmEmailReply>}
 */
const methodInfo_Profile_ConfirmEmail = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ProfilePackage.v2.ConfirmEmailReply,
  /**
   * @param {!proto.ProfilePackage.v2.ConfirmEmailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ProfilePackage.v2.ConfirmEmailReply.deserializeBinary
);


/**
 * @param {!proto.ProfilePackage.v2.ConfirmEmailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ProfilePackage.v2.ConfirmEmailReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ProfilePackage.v2.ConfirmEmailReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ProfilePackage.v2.ProfileClient.prototype.confirmEmail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ProfilePackage.v2.Profile/ConfirmEmail',
      request,
      metadata || {},
      methodDescriptor_Profile_ConfirmEmail,
      callback);
};


/**
 * @param {!proto.ProfilePackage.v2.ConfirmEmailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ProfilePackage.v2.ConfirmEmailReply>}
 *     A native promise that resolves to the response
 */
proto.ProfilePackage.v2.ProfilePromiseClient.prototype.confirmEmail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ProfilePackage.v2.Profile/ConfirmEmail',
      request,
      metadata || {},
      methodDescriptor_Profile_ConfirmEmail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ProfilePackage.v2.ConfirmEmailLinkRequest,
 *   !proto.ProfilePackage.v2.ConfirmEmailReply>}
 */
const methodDescriptor_Profile_ConfirmEmailLink = new grpc.web.MethodDescriptor(
  '/ProfilePackage.v2.Profile/ConfirmEmailLink',
  grpc.web.MethodType.UNARY,
  proto.ProfilePackage.v2.ConfirmEmailLinkRequest,
  proto.ProfilePackage.v2.ConfirmEmailReply,
  /**
   * @param {!proto.ProfilePackage.v2.ConfirmEmailLinkRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ProfilePackage.v2.ConfirmEmailReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ProfilePackage.v2.ConfirmEmailLinkRequest,
 *   !proto.ProfilePackage.v2.ConfirmEmailReply>}
 */
const methodInfo_Profile_ConfirmEmailLink = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ProfilePackage.v2.ConfirmEmailReply,
  /**
   * @param {!proto.ProfilePackage.v2.ConfirmEmailLinkRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ProfilePackage.v2.ConfirmEmailReply.deserializeBinary
);


/**
 * @param {!proto.ProfilePackage.v2.ConfirmEmailLinkRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ProfilePackage.v2.ConfirmEmailReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ProfilePackage.v2.ConfirmEmailReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ProfilePackage.v2.ProfileClient.prototype.confirmEmailLink =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ProfilePackage.v2.Profile/ConfirmEmailLink',
      request,
      metadata || {},
      methodDescriptor_Profile_ConfirmEmailLink,
      callback);
};


/**
 * @param {!proto.ProfilePackage.v2.ConfirmEmailLinkRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ProfilePackage.v2.ConfirmEmailReply>}
 *     A native promise that resolves to the response
 */
proto.ProfilePackage.v2.ProfilePromiseClient.prototype.confirmEmailLink =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ProfilePackage.v2.Profile/ConfirmEmailLink',
      request,
      metadata || {},
      methodDescriptor_Profile_ConfirmEmailLink);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ProfilePackage.v2.DeleteAccountRequest,
 *   !proto.ProfilePackage.v2.Empty>}
 */
const methodDescriptor_Profile_DeleteAccount = new grpc.web.MethodDescriptor(
  '/ProfilePackage.v2.Profile/DeleteAccount',
  grpc.web.MethodType.UNARY,
  proto.ProfilePackage.v2.DeleteAccountRequest,
  proto.ProfilePackage.v2.Empty,
  /**
   * @param {!proto.ProfilePackage.v2.DeleteAccountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ProfilePackage.v2.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.ProfilePackage.v2.DeleteAccountRequest,
 *   !proto.ProfilePackage.v2.Empty>}
 */
const methodInfo_Profile_DeleteAccount = new grpc.web.AbstractClientBase.MethodInfo(
  proto.ProfilePackage.v2.Empty,
  /**
   * @param {!proto.ProfilePackage.v2.DeleteAccountRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ProfilePackage.v2.Empty.deserializeBinary
);


/**
 * @param {!proto.ProfilePackage.v2.DeleteAccountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.ProfilePackage.v2.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ProfilePackage.v2.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.ProfilePackage.v2.ProfileClient.prototype.deleteAccount =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/ProfilePackage.v2.Profile/DeleteAccount',
      request,
      metadata || {},
      methodDescriptor_Profile_DeleteAccount,
      callback);
};


/**
 * @param {!proto.ProfilePackage.v2.DeleteAccountRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ProfilePackage.v2.Empty>}
 *     A native promise that resolves to the response
 */
proto.ProfilePackage.v2.ProfilePromiseClient.prototype.deleteAccount =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/ProfilePackage.v2.Profile/DeleteAccount',
      request,
      metadata || {},
      methodDescriptor_Profile_DeleteAccount);
};


module.exports = proto.ProfilePackage.v2;

