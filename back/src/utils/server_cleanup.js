import { mainLogger as ml } from '#src/utils/loggers.js'

export async function cleanup(server, exitCode = 0) {
  ml.info(`Server is closing on port ${process.env.PORT}`)

  server.close(function (err) {
    if (err) {
      ml.error(err.message)
      process.exit(1)
    }
    process.exit(exitCode)
  })
}
