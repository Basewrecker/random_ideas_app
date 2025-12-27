import Modal from './components/Modal.js'
import IdeaForm from './components/IdeaForm.js'
import IdeaList from './components/ideaList.js'
import './css/style.css';
//import '@fortawesome/fontawesome-free/css/all.css'

new Modal();
const ideaForm = new IdeaForm();
ideaForm.render();
new IdeaList();
