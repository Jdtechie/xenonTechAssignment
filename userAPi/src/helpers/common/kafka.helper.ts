import { Kafka, Producer, Consumer, EachMessagePayload } from 'kafkajs';
import * as CM from '../../constant/response';
import { Interface } from '../../interfaces/index';

const kafka = new Kafka({
  clientId: CM.KAFKA_CRED.CLIENT_ID,
  brokers: [CM.KAFKA_CRED.BROKERS_URL],
});

class KafkaProducer {
  public producer: Producer;
  private topicName: string;
  private topicPayload: object;

  constructor(topic: string, messages: object) {
    this.producer = kafka.producer();
    this.topicName = topic;
    this.topicPayload = messages;
    this.produceMessage();
  }
  public async produceMessage() {
    try {
      this.producer
        .connect()
        .then(async () => {
          await this.producer
            .send({
              topic: this.topicName,
              messages: [{ value: JSON.stringify(this.topicPayload) }],
            })
            .then(() => {
              console.log(' DONE SENDING !!!');
            })
            .catch((error) => {
              console.log('ERROR IN KAFKA PRODUCER', error);
            });
        })
        .catch((error) => {
          console.log('ERROR IN KAFKA PRODUCER', error);
        });
    } catch (error) {
      console.log('ERROR IN KAFKA PRODUCER', error);
    }
  }
}

class KafkaConsumer {
  public consumer: Consumer;
  private topicName: string;
  private isFromBeginning: boolean;

  constructor(topic: string, fromBeginning = false) {
    this.consumer = kafka.consumer({
      groupId: `registrations_${Math.random()}`,
    });
    this.topicName = topic;
    this.isFromBeginning = fromBeginning;
    this.subscribeConsumer();
  }
  public async subscribeConsumer() {
    try {
      await this.consumer
        .connect()
        .then(async () => {
          await this.consumer
            .subscribe({
              topic: this.topicName,
              fromBeginning: this.isFromBeginning,
            })
            .then(async () => {
              console.log('SUBSCRIBE TO KAFKA CONSUMER');
              console.log(`CONSUME  ${this.topicName}`);
              await this.consumeQueue();
            })
            .catch((err) => {
              console.log('ERROR IN SUBSCRIBE TO CONSUMER KAFKA  :: ', err);
            });
        })
        .catch((error) => {
          console.log('ERROR IN KAFKA PRODUCER', error);
        });
    } catch (error) {
      console.log('ERROR IN KAFKA ', error);
    }
  }

  public async consumeQueue() {
    let consumedData: Interface.CONSUMED_DATA;
    await this.consumer
      .run({
        eachMessage: async (payload: EachMessagePayload) => {
          console.log('CONSUMED DATA', {
            topic: payload.topic,
            partition: payload.partition,
            offset: payload.message.offset,
            value: payload.message.value
              ? payload.message.value.toString()
              : 'value is null',
          });

          consumedData = JSON.parse(`${payload.message.value}`);
          console.log('final', consumedData);
        },
      })
      .catch((err) => {
        console.log('ERROR IN CONSUMING QUEUE ::', err);
      });
  }
}

export { KafkaConsumer, KafkaProducer };
