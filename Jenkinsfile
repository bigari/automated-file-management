pipeline {

    agent any

    try{
        stage('Build') {
            sh './run.sh -t'
        }
        stage('Backend tests') {
            agent {
                docker {
                    image: 'rest-api'
                }
            }
            sh 'npm run test'
        }
        stage('Frontend tests') {
            agent {
                docker {
                    image: 'webapp'
                }
            }
            sh 'npm run test'
        }
        stage('Packaging') {

        }
    }
    catch(error) {

    }finally {
        docker-compose stop rest-api
        docker-compose stop webapp
    }
}