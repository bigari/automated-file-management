pipeline {

    agent any

    stages {
        stage('Build') {
            steps{
                sh 'docker-compose -f docker-compose-test.yml build'
            }
        }

        stage('Testing') {
            parallel {
                stage('Backend tests') {
                    agent {
                        docker {
                            image 'afm_rest-api'
                            args '--rm -d -p 5002:5002'
                        }
                    }
                    steps{
                        // sh 'cd /usr/src/app && npm run test'
                        sh 'node --version'   
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
                        sh 'cd /usr/src/app && npm run test'
                        sh 'exit 0' 
                    }
                }
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