const fastify = require('fastify')({ logger: true })
const axios = require('axios')

fastify.get('/', async (request, reply) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'https://docs.gradle.org/current/userguide/userguide.html',
            responseType: 'text'
        })
        const html = response.data.toString()
        const startHtml = '<script type="text/javascript" defer>\n  window.siteDecorateVersion = "'
        const startIndex = html.indexOf(startHtml)
        const endIndex = html.indexOf('";', startIndex)
        const value = html.substring(startIndex + startHtml.length, endIndex)
        console.log(value);
        reply.code(200)
            .send(value)
    } catch (error) {
        console.error(error);
        reply.code(500)
            .send()
    }
})

// Run the server!
const start = async () => {
    try {
        let port = process.env.PORT
        if (port == null) { port = 3000 }
        await fastify.listen(port)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
