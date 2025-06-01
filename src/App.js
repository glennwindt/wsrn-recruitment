{
  "name": "wsrn-recruitment",
  "version": "1.0.0",
  "private": true,
  "description": "Worldwide Seafarers Recruitment Network (WSRN) - Web Dashboard",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "deploy": "firebase deploy"
  },
  "dependencies": {
    "firebase": "^9.23.0",
    "@react-native-firebase/app": "^18.8.0",
    "@react-native-firebase/auth": "^18.8.0",
    "@react-native-firebase/firestore": "^18.8.0",
    "@react-native-firebase/storage": "^18.8.0",
    "@react-native-firebase/messaging": "^18.8.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "react-firebase-hooks": "^5.1.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.15",
    "postcss": "^8.4.30",
    "browserslist": "^4.21.1",
    "file-type": "^18.3.1",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "eslint": "^8.45.0",
    "prettier": "^3.2.4",
    "eslint-config-prettier": "^8.11.0",
    "eslint-plugin-react": "^7.33.2",
    "husky": "^8.0.0",
    "lint-staged": "^13.2.3"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "lint-staged": {
    "src/**/*.js": [
      "eslint 'src/**/*.{js,jsx}' --quiet",
      "git add"
    ],
    "src/**/*.jsx": [
      "eslint 'src/**/*.{js,jsx}' --quiet",
      "git add"
    ]
  }
}