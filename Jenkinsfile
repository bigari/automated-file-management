pipeline {

    agent any

    stages {
        stage('Build') {
            steps{
                sh 'docker-compose -f docker-compose-test.yml build'
            }
        }
        stage('Backend tests') {
            agent {
                docker {
                    image 'afm_rest-api'
                    args '--rm -d -p 5002:5002'
                }
            }
            steps{
                sh 'npm run test && exit'   
            }
        }
        stage('Frontend tests') {
            agent {
                docker {
                    image 'afm_webapp'
                    args '--rm -d -p 5001:3000'
                }
            }
            steps{
                sh 'npm run test && exit' 
            }
        }
        stage("Clean"){
            steps {
                sh 'docker-compose stop webapp'
                sh 'docker-compose stop rest-api'
            }
        }

    }
        
}