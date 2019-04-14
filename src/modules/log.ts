export default function log(format: string, ...args) {
  console.log(`%s ${format}`, new Date().toISOString(), ...args);
}
