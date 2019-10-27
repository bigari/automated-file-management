pipeline {

    agent any
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

    stage("Clean"){
        sh 'docker-compose stop webapp'
        sh 'docker-compose stop rest-api'
    }
    stage('Packaging') {

    }
    
}