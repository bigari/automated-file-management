pipeline {

    agent any

    stages {
        stage('Build') {
            steps{
                sh 'docker-compose -f docker-compose-test.yml up'    
            }
            
        }
        stage('Backend tests') {
            agent {
                docker {
                    image 'afm_rest-api'
                }
            }
            steps{
                sh 'cd /usr/src/app'
                sh 'npm run test'    
            }
            
            
        }
        stage('Frontend tests') {
            agent {
                docker {
                    image 'afm_webapp'
                }
            }
            steps{
                sh 'cd /usr/src/app'
                sh 'npm run test'    
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