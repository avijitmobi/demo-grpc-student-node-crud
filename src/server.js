const path = require('path')
const GRPCServer = require('./grpcService/grpcServer')

const students = [
    {
        id: '5c46e3fa51d14c0897003c2a',
        name: 'Avijit',
        subject: 'Bengali'
    },
    {
        id: '5c46e3fa51d14c0897003c2a',
        name: 'Samiran',
        subject: 'English'
    },
    {
        id: '5c46e3fa51d14c0897003c2a',
        name: 'Avijit',
        subject: 'Bengali'
    },
    {
        id: '5c46e3fa51d14c0897003c2a',
        name: 'Arif',
        subject: 'English'
    }
]

const studentInfo = {
    id: '5c46e3fa51d14c0897003c2a',
    name: 'Sudip',
    subject: 'Bengali'
}

const server = new GRPCServer({
    url: 'localhost:8000',
    protoPath: path.join(__dirname, '../src/protos/student.proto'),
    packageName: 'student',
    serviceName: 'StudentService',
    service: {
        FindStuById: wrapFunc(findById),
        FindStudents: (call, callback) => {
            callback(null, { students })
        }
    }
})

function findById(call) {
    let studentId = call.request.id
    // async to get book info
    return {
        book: {
            id: studentId,
            name: studentInfo.title,
            subject: studentInfo.author
        }
    }
}

function wrapFunc(fn) {
    return async function (call, callback) {
        try {
            let result = await fn(call)
            callback(null, result)
        } catch (err) {
            callback(err)
        }
    }
}

server.start()
