export const RMQ_PATTERNS = {
  RMQ_PATTERN_FILE_UPLOADED: 'file_uploaded',
  RMQ_PATTERN_FILE_SAVED: 'file_saved',
  RMQ_PATTERN_FILE_COMPRESSING: 'file_compressing',
  RMQ_PATTERN_FILE_COMPRESSED_SAVED: 'file_compressed_ready',
  RMQ_PATTERN_FILE_COMPRESSED: 'file_compressed'
}

const rmqUser = process.env.RABBITMQ_DEFAULT_USER;
  const rmqPass = process.env.RABBITMQ_DEFAULT_PASS;
  const rmqDomain = process.env.RABBITMQ_DOMAIN;
  const rmqPort = process.env.RABBITMQ_PORT;
  const rmqVHost = process.env.RABBITMQ_DEFAULT_VHOST;
  
export const RMQ_CONNECTION_STRING = `amqp://${rmqUser}:${rmqPass}@${rmqDomain}:${rmqPort}/${rmqVHost}`;


export const RMW_QUEUES = {
  API_QUEUE: 'API_QUEUE',
  COMPRESSOR_QUEUE: 'COMPRESSOR_QUEUE' 
}