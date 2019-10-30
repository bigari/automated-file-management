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
                            args '-p 5002:5002'
                        }
                    }
                    steps{
                        sh 'cd /usr/src/app && npm run test'
                    }
                }
                stage('Frontend tests') {
                    agent {
                        docker {
                            image 'afm_webapp'
                            args '-p 5001:3000'
                        }
                    }
                    steps{
                        sh 'cd /usr/src/app && npm run test'
                    }
                }
            }
        }
    }
    post {
        always {
            sh 'docker images prune'
        }
    }
    
}