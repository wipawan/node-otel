const { NodeSDK } = require("@opentelemetry/sdk-node");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-grpc");
const {
  OTLPMetricExporter,
} = require("@opentelemetry/exporter-metrics-otlp-grpc");
const {
  OTLPLogExporter,
} = require("@opentelemetry/exporter-logs-otlp-grpc");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const { PeriodicExportingMetricReader } = require("@opentelemetry/sdk-metrics");
const {
  LoggerProvider,
  SimpleLogRecordProcessor,
} = require("@opentelemetry/sdk-logs");
const { logs } = require("@opentelemetry/api-logs");

const loggerProvider = new LoggerProvider({
  processors: [new SimpleLogRecordProcessor(new OTLPLogExporter())],
});
logs.setGlobalLoggerProvider(loggerProvider);

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter(),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
