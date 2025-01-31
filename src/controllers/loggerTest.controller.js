
const debbug = (req, res) => {
    req.logger.debug(`Este es  debug`)

    res.send({ status: "success", message: "debug" })
}

const http = (req, res) => {
    req.logger.http(`Este es un r http`)
    res.send({ status: "success", message: "http" })
}

const info = (req, res) => {
    req.logger.info(`Este es un error info`)
    res.send({ status: "success", message: "info" })

}

const warning = (req, res) => {
    req.logger.warning(`Este es un error warning`)
    res.send({ status: "success", message: "warning" })
}

const error = (req, res) => {
    req.logger.error(`Este es un error error`)
    res.send({ status: "success", message: "error" })
}

const fatal = (req, res) => {
    req.logger.fatal(`Este es un error fatal`)
    res.send({ status: "success", message: "fatal" })
}

export default {
    debbug,
    http,
    info,
    warning,
    error,
    fatal

}