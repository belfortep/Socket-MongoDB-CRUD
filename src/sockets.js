
const Note = require('./models/Note')

const sockets = (io) => {

    io.on('connect', (socket) => {  //el objeto socket solo envia y recibe datos de la ventana que lo invoca, io es para todos

        const emitNotes = async () => {
            try {
                const notes = await Note.find()

                io.emit('server:loadnotes', notes)
            } catch (err) {
                console.log(err)
            }
        }

        emitNotes()

        socket.on('client:newnote', async (data) => {
            const newNote = await new Note(data)
            const savedNote = await newNote.save()
            io.emit('server:newnote', savedNote)
        })

        socket.on('client:deletenote', async (id) => {
            await Note.findByIdAndDelete(id)
            emitNotes() //saco la nota de la base de datos y vuelvo a cargar los datos
        })

        socket.on('client:getnote', async id => {
            const note = await Note.findById(id)
            io.emit('server:selectednote', note)
        })

        socket.on('client:updatenote', async (updatedNote) => {

            await Note.findByIdAndUpdate(updatedNote._id, {
                title: updatedNote.title,
                description: updatedNote.description
            })

            emitNotes()

        })

    })

}

module.exports = sockets