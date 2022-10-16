/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/base-component.ts":
/*!******************************************!*\
  !*** ./src/components/base-component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Component)
/* harmony export */ });
class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }
}


/***/ }),

/***/ "./src/components/project-input.ts":
/*!*****************************************!*\
  !*** ./src/components/project-input.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectInput": () => (/* binding */ ProjectInput)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _util_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/validation */ "./src/util/validation.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// ProjectInput Class
class ProjectInput extends _base_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5,
        };
        if (!_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate(titleValidatable) ||
            !_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate(descriptionValidatable) ||
            !_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate(peopleValidatable)) {
            alert('Invalid input, please try again!');
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectInput.prototype, "submitHandler", null);


/***/ }),

/***/ "./src/components/project-item.ts":
/*!****************************************!*\
  !*** ./src/components/project-item.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectItem": () => (/* binding */ ProjectItem)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// ProjectItem Class
class ProjectItem extends _base_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(hostId, project) {
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        }
        else {
            return `${this.project.people} persons`;
        }
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(_) {
        console.log('DragEnd');
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.persons + ' assigned';
        this.element.querySelector('p').textContent = this.project.description;
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__.autobind
], ProjectItem.prototype, "dragStartHandler", null);


/***/ }),

/***/ "./src/components/project-list.ts":
/*!****************************************!*\
  !*** ./src/components/project-list.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectList": () => (/* binding */ ProjectList)
/* harmony export */ });
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project */ "./src/models/project.ts");
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project-item */ "./src/components/project-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// ProjectList Class
class ProjectList extends _base_component__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData('text/plain');
        _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.moveProject(prjId, this.type === 'active' ? _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active : _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Finished);
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.addListener((projects) => {
            const relevantProjects = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active;
                }
                return prj.status === _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.textContent = '';
        for (const prjItem of this.assignedProjects) {
            new _project_item__WEBPACK_IMPORTED_MODULE_4__.ProjectItem(this.element.querySelector('ul').id, prjItem);
        }
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectList.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./src/decorators/autobind.ts":
/*!************************************!*\
  !*** ./src/decorators/autobind.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autobind": () => (/* binding */ autobind)
/* harmony export */ });
// autobind decorator
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}


/***/ }),

/***/ "./src/models/project.ts":
/*!*******************************!*\
  !*** ./src/models/project.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project),
/* harmony export */   "ProjectStatus": () => (/* binding */ ProjectStatus)
/* harmony export */ });
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}


/***/ }),

/***/ "./src/state/project-state.ts":
/*!************************************!*\
  !*** ./src/state/project-state.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectState": () => (/* binding */ ProjectState),
/* harmony export */   "projectState": () => (/* binding */ projectState)
/* harmony export */ });
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project */ "./src/models/project.ts");

class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new _models_project__WEBPACK_IMPORTED_MODULE_0__.Project(Math.random().toString(), title, description, numOfPeople, _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();


/***/ }),

/***/ "./src/util/validation.ts":
/*!********************************!*\
  !*** ./src/util/validation.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validate": () => (/* binding */ validate)
/* harmony export */ });
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project-input */ "./src/components/project-input.ts");
/* harmony import */ var _components_project_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/project-list */ "./src/components/project-list.ts");


new _components_project_input__WEBPACK_IMPORTED_MODULE_0__.ProjectInput();
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('active');
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('finished');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJLGdCQUFnQixDQUFDLEtBQUssSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7S0FDckU7SUFDRCxJQUNFLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxJQUFJO1FBQzVCLE9BQU8sZ0JBQWdCLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFDMUM7UUFDQSxPQUFPLEdBQUcsT0FBTyxJQUFJLGdCQUFnQixDQUFDLEtBQUssSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7S0FDckU7SUFDRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDOzs7Ozs7O1VDekNEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjBEO0FBQ0Y7QUFFeEQsSUFBSSxtRUFBWSxFQUFFLENBQUM7QUFDbkIsSUFBSSxpRUFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLElBQUksaUVBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QtbWFuYWdlci8uL3NyYy9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50LnRzIiwid2VicGFjazovL3Byb2plY3QtbWFuYWdlci8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaW5wdXQudHMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1tYW5hZ2VyLy4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1pdGVtLnRzIiwid2VicGFjazovL3Byb2plY3QtbWFuYWdlci8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtbGlzdC50cyIsIndlYnBhY2s6Ly9wcm9qZWN0LW1hbmFnZXIvLi9zcmMvZGVjb3JhdG9ycy9hdXRvYmluZC50cyIsIndlYnBhY2s6Ly9wcm9qZWN0LW1hbmFnZXIvLi9zcmMvbW9kZWxzL3Byb2plY3QudHMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1tYW5hZ2VyLy4vc3JjL3N0YXRlL3Byb2plY3Qtc3RhdGUudHMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1tYW5hZ2VyLy4vc3JjL3V0aWwvdmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly9wcm9qZWN0LW1hbmFnZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHJvamVjdC1tYW5hZ2VyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wcm9qZWN0LW1hbmFnZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wcm9qZWN0LW1hbmFnZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wcm9qZWN0LW1hbmFnZXIvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudDxcclxuICBUIGV4dGVuZHMgSFRNTEVsZW1lbnQsXHJcbiAgVSBleHRlbmRzIEhUTUxFbGVtZW50LFxyXG4+IHtcclxuICB0ZW1wbGF0ZUVsZW1lbnQ6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XHJcbiAgaG9zdEVsZW1lbnQ6IFQ7XHJcbiAgZWxlbWVudDogVTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICB0ZW1wbGF0ZUlkOiBzdHJpbmcsXHJcbiAgICBob3N0RWxlbWVudElkOiBzdHJpbmcsXHJcbiAgICBpbnNlcnRBdFN0YXJ0OiBib29sZWFuLFxyXG4gICAgbmV3RWxlbWVudElkPzogc3RyaW5nLFxyXG4gICkge1xyXG4gICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgICAgdGVtcGxhdGVJZCxcclxuICAgICkhIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XHJcbiAgICB0aGlzLmhvc3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaG9zdEVsZW1lbnRJZCkhIGFzIFQ7XHJcblxyXG4gICAgY29uc3QgaW1wb3J0ZWROb2RlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZShcclxuICAgICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQuY29udGVudCxcclxuICAgICAgdHJ1ZSxcclxuICAgICk7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBpbXBvcnRlZE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQgYXMgVTtcclxuICAgIGlmIChuZXdFbGVtZW50SWQpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LmlkID0gbmV3RWxlbWVudElkO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYXR0YWNoKGluc2VydEF0U3RhcnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhdHRhY2goaW5zZXJ0QXRCZWdpbm5pbmc6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuaG9zdEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxyXG4gICAgICBpbnNlcnRBdEJlZ2lubmluZyA/ICdhZnRlcmJlZ2luJyA6ICdiZWZvcmVlbmQnLFxyXG4gICAgICB0aGlzLmVsZW1lbnQsXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgYWJzdHJhY3QgY29uZmlndXJlKCk6IHZvaWQ7XHJcbiAgYWJzdHJhY3QgcmVuZGVyQ29udGVudCgpOiB2b2lkO1xyXG59XHJcbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi9iYXNlLWNvbXBvbmVudCc7XHJcbmltcG9ydCAqIGFzIFZhbGlkYXRpb24gZnJvbSAnLi4vdXRpbC92YWxpZGF0aW9uJztcclxuaW1wb3J0IHsgYXV0b2JpbmQgYXMgQXV0b2JpbmQgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2F1dG9iaW5kJztcclxuaW1wb3J0IHsgcHJvamVjdFN0YXRlIH0gZnJvbSAnLi4vc3RhdGUvcHJvamVjdC1zdGF0ZSc7XHJcblxyXG4vLyBQcm9qZWN0SW5wdXQgQ2xhc3NcclxuZXhwb3J0IGNsYXNzIFByb2plY3RJbnB1dCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEZvcm1FbGVtZW50PiB7XHJcbiAgdGl0bGVJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgcGVvcGxlSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCdwcm9qZWN0LWlucHV0JywgJ2FwcCcsIHRydWUsICd1c2VyLWlucHV0Jyk7XHJcbiAgICB0aGlzLnRpdGxlSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICcjdGl0bGUnLFxyXG4gICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAnI2Rlc2NyaXB0aW9uJyxcclxuICAgICkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMucGVvcGxlSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICcjcGVvcGxlJyxcclxuICAgICkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMuY29uZmlndXJlKCk7XHJcbiAgfVxyXG5cclxuICBjb25maWd1cmUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5zdWJtaXRIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckNvbnRlbnQoKSB7fVxyXG5cclxuICBwcml2YXRlIGdhdGhlclVzZXJJbnB1dCgpOiBbc3RyaW5nLCBzdHJpbmcsIG51bWJlcl0gfCB2b2lkIHtcclxuICAgIGNvbnN0IGVudGVyZWRUaXRsZSA9IHRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWU7XHJcbiAgICBjb25zdCBlbnRlcmVkRGVzY3JpcHRpb24gPSB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50LnZhbHVlO1xyXG4gICAgY29uc3QgZW50ZXJlZFBlb3BsZSA9IHRoaXMucGVvcGxlSW5wdXRFbGVtZW50LnZhbHVlO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlVmFsaWRhdGFibGU6IFZhbGlkYXRpb24uVmFsaWRhdGFibGUgPSB7XHJcbiAgICAgIHZhbHVlOiBlbnRlcmVkVGl0bGUsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uVmFsaWRhdGFibGU6IFZhbGlkYXRpb24uVmFsaWRhdGFibGUgPSB7XHJcbiAgICAgIHZhbHVlOiBlbnRlcmVkRGVzY3JpcHRpb24sXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBtaW5MZW5ndGg6IDUsXHJcbiAgICB9O1xyXG4gICAgY29uc3QgcGVvcGxlVmFsaWRhdGFibGU6IFZhbGlkYXRpb24uVmFsaWRhdGFibGUgPSB7XHJcbiAgICAgIHZhbHVlOiArZW50ZXJlZFBlb3BsZSxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIG1pbjogMSxcclxuICAgICAgbWF4OiA1LFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgICFWYWxpZGF0aW9uLnZhbGlkYXRlKHRpdGxlVmFsaWRhdGFibGUpIHx8XHJcbiAgICAgICFWYWxpZGF0aW9uLnZhbGlkYXRlKGRlc2NyaXB0aW9uVmFsaWRhdGFibGUpIHx8XHJcbiAgICAgICFWYWxpZGF0aW9uLnZhbGlkYXRlKHBlb3BsZVZhbGlkYXRhYmxlKVxyXG4gICAgKSB7XHJcbiAgICAgIGFsZXJ0KCdJbnZhbGlkIGlucHV0LCBwbGVhc2UgdHJ5IGFnYWluIScpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gW2VudGVyZWRUaXRsZSwgZW50ZXJlZERlc2NyaXB0aW9uLCArZW50ZXJlZFBlb3BsZV07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsZWFySW5wdXRzKCkge1xyXG4gICAgdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZSA9ICcnO1xyXG4gICAgdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQudmFsdWUgPSAnJztcclxuICB9XHJcblxyXG4gIEBBdXRvYmluZFxyXG4gIHByaXZhdGUgc3VibWl0SGFuZGxlcihldmVudDogRXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCB1c2VySW5wdXQgPSB0aGlzLmdhdGhlclVzZXJJbnB1dCgpO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodXNlcklucHV0KSkge1xyXG4gICAgICBjb25zdCBbdGl0bGUsIGRlc2MsIHBlb3BsZV0gPSB1c2VySW5wdXQ7XHJcbiAgICAgIHByb2plY3RTdGF0ZS5hZGRQcm9qZWN0KHRpdGxlLCBkZXNjLCBwZW9wbGUpO1xyXG4gICAgICB0aGlzLmNsZWFySW5wdXRzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IERyYWdnYWJsZSB9IGZyb20gJy4uL21vZGVscy9kcmFnLWRyb3AnO1xyXG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi4vbW9kZWxzL3Byb2plY3QnO1xyXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJy4vYmFzZS1jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBhdXRvYmluZCB9IGZyb20gJy4uL2RlY29yYXRvcnMvYXV0b2JpbmQnO1xyXG5cclxuLy8gUHJvamVjdEl0ZW0gQ2xhc3NcclxuZXhwb3J0IGNsYXNzIFByb2plY3RJdGVtXHJcbiAgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTFVMaXN0RWxlbWVudCwgSFRNTExJRWxlbWVudD5cclxuICBpbXBsZW1lbnRzIERyYWdnYWJsZVxyXG57XHJcbiAgcHJpdmF0ZSBwcm9qZWN0OiBQcm9qZWN0O1xyXG5cclxuICBnZXQgcGVyc29ucygpIHtcclxuICAgIGlmICh0aGlzLnByb2plY3QucGVvcGxlID09PSAxKSB7XHJcbiAgICAgIHJldHVybiAnMSBwZXJzb24nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGAke3RoaXMucHJvamVjdC5wZW9wbGV9IHBlcnNvbnNgO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoaG9zdElkOiBzdHJpbmcsIHByb2plY3Q6IFByb2plY3QpIHtcclxuICAgIHN1cGVyKCdzaW5nbGUtcHJvamVjdCcsIGhvc3RJZCwgZmFsc2UsIHByb2plY3QuaWQpO1xyXG4gICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcclxuXHJcbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgfVxyXG5cclxuICBAYXV0b2JpbmRcclxuICBkcmFnU3RhcnRIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcclxuICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuc2V0RGF0YSgndGV4dC9wbGFpbicsIHRoaXMucHJvamVjdC5pZCk7XHJcbiAgICBldmVudC5kYXRhVHJhbnNmZXIhLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XHJcbiAgfVxyXG5cclxuICBkcmFnRW5kSGFuZGxlcihfOiBEcmFnRXZlbnQpIHtcclxuICAgIGNvbnNvbGUubG9nKCdEcmFnRW5kJyk7XHJcbiAgfVxyXG5cclxuICBjb25maWd1cmUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgdGhpcy5kcmFnU3RhcnRIYW5kbGVyKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgdGhpcy5kcmFnRW5kSGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICByZW5kZXJDb250ZW50KCkge1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykhLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LnRpdGxlO1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gzJykhLnRleHRDb250ZW50ID0gdGhpcy5wZXJzb25zICsgJyBhc3NpZ25lZCc7XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigncCcpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC5kZXNjcmlwdGlvbjtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRHJhZ1RhcmdldCB9IGZyb20gJy4uL21vZGVscy9kcmFnLWRyb3AnO1xyXG5pbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0U3RhdHVzIH0gZnJvbSAnLi4vbW9kZWxzL3Byb2plY3QnO1xyXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJy4vYmFzZS1jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBhdXRvYmluZCB9IGZyb20gJy4uL2RlY29yYXRvcnMvYXV0b2JpbmQnO1xyXG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tICcuLi9zdGF0ZS9wcm9qZWN0LXN0YXRlJztcclxuaW1wb3J0IHsgUHJvamVjdEl0ZW0gfSBmcm9tICcuL3Byb2plY3QtaXRlbSc7XHJcblxyXG4vLyBQcm9qZWN0TGlzdCBDbGFzc1xyXG5leHBvcnQgY2xhc3MgUHJvamVjdExpc3RcclxuICBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEVsZW1lbnQ+XHJcbiAgaW1wbGVtZW50cyBEcmFnVGFyZ2V0XHJcbntcclxuICBhc3NpZ25lZFByb2plY3RzOiBQcm9qZWN0W107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogJ2FjdGl2ZScgfCAnZmluaXNoZWQnKSB7XHJcbiAgICBzdXBlcigncHJvamVjdC1saXN0JywgJ2FwcCcsIGZhbHNlLCBgJHt0eXBlfS1wcm9qZWN0c2ApO1xyXG4gICAgdGhpcy5hc3NpZ25lZFByb2plY3RzID0gW107XHJcblxyXG4gICAgdGhpcy5jb25maWd1cmUoKTtcclxuICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xyXG4gIH1cclxuXHJcbiAgQGF1dG9iaW5kXHJcbiAgZHJhZ092ZXJIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcclxuICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIgJiYgZXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzWzBdID09PSAndGV4dC9wbGFpbicpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhO1xyXG4gICAgICBsaXN0RWwuY2xhc3NMaXN0LmFkZCgnZHJvcHBhYmxlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBAYXV0b2JpbmRcclxuICBkcm9wSGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XHJcbiAgICBjb25zdCBwcmpJZCA9IGV2ZW50LmRhdGFUcmFuc2ZlciEuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xyXG4gICAgcHJvamVjdFN0YXRlLm1vdmVQcm9qZWN0KFxyXG4gICAgICBwcmpJZCxcclxuICAgICAgdGhpcy50eXBlID09PSAnYWN0aXZlJyA/IFByb2plY3RTdGF0dXMuQWN0aXZlIDogUHJvamVjdFN0YXR1cy5GaW5pc2hlZCxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBAYXV0b2JpbmRcclxuICBkcmFnTGVhdmVIYW5kbGVyKF86IERyYWdFdmVudCkge1xyXG4gICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhO1xyXG4gICAgbGlzdEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3BwYWJsZScpO1xyXG4gIH1cclxuXHJcbiAgY29uZmlndXJlKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5kcmFnT3ZlckhhbmRsZXIpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlSGFuZGxlcik7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMuZHJvcEhhbmRsZXIpO1xyXG5cclxuICAgIHByb2plY3RTdGF0ZS5hZGRMaXN0ZW5lcigocHJvamVjdHM6IFByb2plY3RbXSkgPT4ge1xyXG4gICAgICBjb25zdCByZWxldmFudFByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKHByaiA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScpIHtcclxuICAgICAgICAgIHJldHVybiBwcmouc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkFjdGl2ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuRmluaXNoZWQ7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSByZWxldmFudFByb2plY3RzO1xyXG4gICAgICB0aGlzLnJlbmRlclByb2plY3RzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlbmRlckNvbnRlbnQoKSB7XHJcbiAgICBjb25zdCBsaXN0SWQgPSBgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgO1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhLmlkID0gbGlzdElkO1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykhLnRleHRDb250ZW50ID1cclxuICAgICAgdGhpcy50eXBlLnRvVXBwZXJDYXNlKCkgKyAnIFBST0pFQ1RTJztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVuZGVyUHJvamVjdHMoKSB7XHJcbiAgICBjb25zdCBsaXN0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgICAgYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YCxcclxuICAgICkhIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICBsaXN0RWwudGV4dENvbnRlbnQgPSAnJztcclxuICAgIGZvciAoY29uc3QgcHJqSXRlbSBvZiB0aGlzLmFzc2lnbmVkUHJvamVjdHMpIHtcclxuICAgICAgbmV3IFByb2plY3RJdGVtKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpIS5pZCwgcHJqSXRlbSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIi8vIGF1dG9iaW5kIGRlY29yYXRvclxuZXhwb3J0IGZ1bmN0aW9uIGF1dG9iaW5kKF86IGFueSwgXzI6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gIGNvbnN0IG9yaWdpbmFsTWV0aG9kID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgY29uc3QgYWRqRGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yID0ge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQoKSB7XG4gICAgICBjb25zdCBib3VuZEZuID0gb3JpZ2luYWxNZXRob2QuYmluZCh0aGlzKTtcbiAgICAgIHJldHVybiBib3VuZEZuO1xuICAgIH0sXG4gIH07XG4gIHJldHVybiBhZGpEZXNjcmlwdG9yO1xufVxuIiwiZXhwb3J0IGVudW0gUHJvamVjdFN0YXR1cyB7XHJcbiAgQWN0aXZlLFxyXG4gIEZpbmlzaGVkLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyxcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nLFxyXG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgcGVvcGxlOiBudW1iZXIsXHJcbiAgICBwdWJsaWMgc3RhdHVzOiBQcm9qZWN0U3RhdHVzLFxyXG4gICkge31cclxufVxyXG4iLCJpbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0U3RhdHVzIH0gZnJvbSAnLi4vbW9kZWxzL3Byb2plY3QnO1xyXG5cclxuLy8gUHJvamVjdCBTdGF0ZSBNYW5hZ2VtZW50XHJcbnR5cGUgTGlzdGVuZXI8VD4gPSAoaXRlbXM6IFRbXSkgPT4gdm9pZDtcclxuXHJcbmNsYXNzIFN0YXRlPFQ+IHtcclxuICBwcm90ZWN0ZWQgbGlzdGVuZXJzOiBMaXN0ZW5lcjxUPltdID0gW107XHJcblxyXG4gIGFkZExpc3RlbmVyKGxpc3RlbmVyRm46IExpc3RlbmVyPFQ+KSB7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyRm4pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFByb2plY3RTdGF0ZSBleHRlbmRzIFN0YXRlPFByb2plY3Q+IHtcclxuICBwcml2YXRlIHByb2plY3RzOiBQcm9qZWN0W10gPSBbXTtcclxuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUHJvamVjdFN0YXRlO1xyXG5cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBQcm9qZWN0U3RhdGUoKTtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgYWRkUHJvamVjdCh0aXRsZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBudW1PZlBlb3BsZTogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoXHJcbiAgICAgIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKSxcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICBudW1PZlBlb3BsZSxcclxuICAgICAgUHJvamVjdFN0YXR1cy5BY3RpdmUsXHJcbiAgICApO1xyXG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xyXG4gICAgdGhpcy51cGRhdGVMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIG1vdmVQcm9qZWN0KHByb2plY3RJZDogc3RyaW5nLCBuZXdTdGF0dXM6IFByb2plY3RTdGF0dXMpIHtcclxuICAgIGNvbnN0IHByb2plY3QgPSB0aGlzLnByb2plY3RzLmZpbmQocHJqID0+IHByai5pZCA9PT0gcHJvamVjdElkKTtcclxuICAgIGlmIChwcm9qZWN0ICYmIHByb2plY3Quc3RhdHVzICE9PSBuZXdTdGF0dXMpIHtcclxuICAgICAgcHJvamVjdC5zdGF0dXMgPSBuZXdTdGF0dXM7XHJcbiAgICAgIHRoaXMudXBkYXRlTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUxpc3RlbmVycygpIHtcclxuICAgIGZvciAoY29uc3QgbGlzdGVuZXJGbiBvZiB0aGlzLmxpc3RlbmVycykge1xyXG4gICAgICBsaXN0ZW5lckZuKHRoaXMucHJvamVjdHMuc2xpY2UoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcHJvamVjdFN0YXRlID0gUHJvamVjdFN0YXRlLmdldEluc3RhbmNlKCk7XHJcbiIsImV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGFibGUge1xyXG4gIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgcmVxdWlyZWQ/OiBib29sZWFuO1xyXG4gIG1pbkxlbmd0aD86IG51bWJlcjtcclxuICBtYXhMZW5ndGg/OiBudW1iZXI7XHJcbiAgbWluPzogbnVtYmVyO1xyXG4gIG1heD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlKHZhbGlkYXRhYmxlSW5wdXQ6IFZhbGlkYXRhYmxlKSB7XHJcbiAgbGV0IGlzVmFsaWQgPSB0cnVlO1xyXG4gIGlmICh2YWxpZGF0YWJsZUlucHV0LnJlcXVpcmVkKSB7XHJcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCAhPT0gMDtcclxuICB9XHJcbiAgaWYgKFxyXG4gICAgdmFsaWRhdGFibGVJbnB1dC5taW5MZW5ndGggIT0gbnVsbCAmJlxyXG4gICAgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09ICdzdHJpbmcnXHJcbiAgKSB7XHJcbiAgICBpc1ZhbGlkID1cclxuICAgICAgaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLmxlbmd0aCA+PSB2YWxpZGF0YWJsZUlucHV0Lm1pbkxlbmd0aDtcclxuICB9XHJcbiAgaWYgKFxyXG4gICAgdmFsaWRhdGFibGVJbnB1dC5tYXhMZW5ndGggIT0gbnVsbCAmJlxyXG4gICAgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09ICdzdHJpbmcnXHJcbiAgKSB7XHJcbiAgICBpc1ZhbGlkID1cclxuICAgICAgaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLmxlbmd0aCA8PSB2YWxpZGF0YWJsZUlucHV0Lm1heExlbmd0aDtcclxuICB9XHJcbiAgaWYgKFxyXG4gICAgdmFsaWRhdGFibGVJbnB1dC5taW4gIT0gbnVsbCAmJlxyXG4gICAgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09ICdudW1iZXInXHJcbiAgKSB7XHJcbiAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID49IHZhbGlkYXRhYmxlSW5wdXQubWluO1xyXG4gIH1cclxuICBpZiAoXHJcbiAgICB2YWxpZGF0YWJsZUlucHV0Lm1heCAhPSBudWxsICYmXHJcbiAgICB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gJ251bWJlcidcclxuICApIHtcclxuICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPD0gdmFsaWRhdGFibGVJbnB1dC5tYXg7XHJcbiAgfVxyXG4gIHJldHVybiBpc1ZhbGlkO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgUHJvamVjdElucHV0IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2plY3QtaW5wdXQnO1xuaW1wb3J0IHsgUHJvamVjdExpc3QgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdC1saXN0JztcblxubmV3IFByb2plY3RJbnB1dCgpO1xubmV3IFByb2plY3RMaXN0KCdhY3RpdmUnKTtcbm5ldyBQcm9qZWN0TGlzdCgnZmluaXNoZWQnKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==