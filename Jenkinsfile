pipeline {

    agent any

    stages {
        stage('Build') {
            steps{
                sh 'docker build -t afm_client -f ./frontend/Dockerfile ./frontend'
                sh 'docker build -t afm_api -f ./backend/Dockerfile ./backend'
            }
            
        }
        stage('Backend tests') {
            agent {
                docker {
                    image 'afm_api'
                    args '--rm -d -p 5002:5002'
                }
            }
            steps{
                sh 'cd /usr/src/app && npm run test'    
            }
            
            
        }
        stage('Frontend tests') {
            agent {
                docker {
                    image 'afm_client'
                    args '--rm -d -p 5001:3000'
                }
            }
            steps{
                sh 'cd /usr/src/app && npm run test'    
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