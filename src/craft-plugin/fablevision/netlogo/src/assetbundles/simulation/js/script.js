var fv = (function(self){

	var headers, userId, journeyId, taskId;

	function initialize() {
        userId = window.__USER_ID__;
        journeyId = window.__JOURNEY_ID__;
        taskId = window.__TASK_ID__;
		headers = generateHeader();
	}

    function refreshStudentProjects(){
        getStudentsWithInfo(fillTableGallery);
    }
    
    function organizeData(studentRows){
        let tableData = {};
        const task = $('select#projects-task option:selected').val();
        const allTasks = [...document.querySelectorAll('#projects-task option')].map(o => o.value).filter(o => o != 'all');

        for(row of studentRows){
            const key = 'student' + row.userId
            const { dateUpdated, image, progress, progressId, title, taskId, journeyId, ...studentRow } = row;
            if (!tableData[key]){
                tableData[key] = studentRow;
            }
            if (row.progressId !== null){
                const { firstName, lastName, studentNumber, userId, ...savedRow } = row;
                if(tableData[key].progress){
                    tableData[key].progress.push(savedRow)
                }
                else{
                    tableData[key].progress = [savedRow];
                }
            }
        }

        Object.entries(tableData).forEach(entry => {
            const [key, value] = entry;
            tableData[key].sortedProgress = [];
            if(tableData[key].progress){
                tableData[key].sortedProgress = tableData[key].progress.sort((a, b) => (Date.parse(a.dateUpdated) < Date.parse(b.dateUpdated)) ? 1 : -1);
                if(task !== 'all'){
                    tableData[key].sortedProgress = tableData[key].sortedProgress.filter(model => model.taskId === task);
                } else {
                    tableData[key].sortedProgress = tableData[key].sortedProgress.filter(model => allTasks.includes(model.taskId));
                }
            }
        });
        return tableData
    }

    function fillTableGallery(studentRows){
        let journeyInfo = Object.values(window.__ALL_INFO__.journeys);
        let rows = organizeData(studentRows);
        const view = $('select#projects-view option:selected').val();
        if(view === 'table'){
            $( "#projects-gallery" ).remove();
            $('#student-view').html('<table id="projects-table" class="projects-table"><thead><tr><th>Favorite</th><th>First Name</th><th>Last Name</th><th>Student Number</th><th>Models Saved</th><th>Last Saved Task</th></tr></thead><tbody id="mytable"></tbody></table>');
        }
        else if(view === 'gallery'){
            $( "#projects-table" ).remove();
            $('#student-view').html('<div id="projects-gallery" class="projects-gallery"></div>')
        }
        const table = document.getElementById('mytable');
        const gallery = document.getElementById('projects-gallery');
        const studentSort = $('select#projects-sort option:selected').val()
        rows = Object.values(rows);
        getFavorites((favorites) => {

            for (let row of rows){
                row.favorite = _.findWhere(favorites, {studentId: parseInt(row.userId), taskId: parseInt(row.sortedProgress[0]?.taskId)}) ? true : false;
            }

            switch (studentSort) {
                case 'firstNameAZ':
                    rows = rows.sort((a,b) => (a.firstName > b.firstName) ? 1 : -1);
                    break;
                case 'firstNameZA':
                    rows = rows.sort((a,b) => (b.firstName > a.firstName) ? 1 : -1);
                    break;
                case 'lastNameAZ':
                    rows = rows.sort((a,b) => (a.lastName > b.lastName) ? 1 : -1);
                    break;
                case 'lastNameZA':
                    rows = rows.sort((a,b) => (b.lastName > a.lastName) ? 1 : -1);
                    break;
                case 'numModels':
                    rows = rows.sort((a,b) => (a.sortedProgress.length > b.sortedProgress.length) ? -1 : 1);
                    break;
                case 'lastModified':
                    rows = rows.sort((a, b) => (a.dateUpdated > b.dateUpdated) ? -1 : 1);
                    break;
                case 'favorites':
                    rows = rows.sort((a, b) => (a.favorite > b.favorite) ? -1 : 1);
                    break;
                case 'studentNumber09':
                    rows = rows.sort((a, b) => (b.studentNumber > a.studentNumber) ? -1 : 1);
                    break;
                case 'studentNumber90':
                    rows = rows.sort((a, b) => (a.studentNumber > b.studentNumber) ? -1 : 1);
                    break;
            }
            
            if(view === 'table'){
                window["__BLOCKLY_VIEW__"] = false;
                table.innerHTML = '';
                for(let row of Object.values(rows)){
                    const journey = _.findWhere(journeyInfo, {id: parseInt(row.sortedProgress[0]?.journeyId)});
                    const task = _.findWhere(journey?.tasks, {id: parseInt(row.sortedProgress[0]?.taskId)});

                    let newRow = table.insertRow(-1);

                    let favorite = newRow.insertCell(0);
                    if(row.sortedProgress.length > 0){
                        favorite.innerHTML = '<button id="student' + row.userId + '-task' + row.sortedProgress[0].taskId + '" onclick="window.fv.favoriteRow(' + row.userId + ', ' + row.sortedProgress[0].taskId + ')" class="favorite-button">' + (row.favorite ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>') + '</button>';
                        favorite.style.textAlign = 'center';
                    }

                    let first = newRow.insertCell(1);
                    first.innerHTML = row.firstName;
                    
                    let last = newRow.insertCell(2);
                    last.innerHTML = row.lastName;

                    let number = newRow.insertCell(3);
                    number.innerHTML = row.studentNumber;

                    let modelNum = newRow.insertCell(4);
                    modelNum.innerHTML = row.sortedProgress?.length || 0;

                    let lastModified = newRow.insertCell(5);
                    let openModels = newRow.insertCell(6);

                    if(row.sortedProgress.length > 0){
                        lastModified.innerHTML = '<span class="latest-task">' + task.title + '</span> ' + (new Date(row.sortedProgress[0].dateUpdated.split(' ')[0] + 'T' + row.sortedProgress[0].dateUpdated.split(' ')[1] + 'Z'));
                        openModels.innerHTML = '<a href="/dashboard/projects/?journeyId=' + row.sortedProgress[0].journeyId + '&taskId=' + row.sortedProgress[0].taskId + '&studentId=' + row.userId + '">Open Models</a>';
                    }
                    else{
                        lastModified.innerHTML = '';
                        openModels.innerHTML = '<a>No Models</a>';
                    }
                }
            }
            else{
                window["__BLOCKLY_VIEW__"] = true;
                gallery.innerHTML = '';
                for (row of Object.values(rows)) {
                    const journey = _.findWhere(journeyInfo, {id: parseInt(row.sortedProgress[0]?.journeyId)});
                    const task = _.findWhere(journey?.tasks, {id: parseInt(row.sortedProgress[0]?.taskId)});

                    let student = document.createElement("div");
                    student.className = 'student-card';
                    
                    let contents = document.createElement("div");
                    contents.className = 'student-contents';
                    
                    let name = document.createElement("div");
                    name.className = 'student-name'
                    name.innerHTML = row.firstName + ' ' + row.lastName + ' ' + row.studentNumber;
                    contents.appendChild(name);
    
                    let lastSaved = document.createElement("div");
                    lastSaved.className = 'last-saved';
    
                    if(row.sortedProgress[0]?.image && row.sortedProgress[0].image != 'data:,'){
                        let lastSavedImage = document.createElement("img");
                        lastSavedImage.className = 'last-saved-image';
                        lastSavedImage.src = row.sortedProgress[0].image;
                        lastSaved.appendChild(lastSavedImage);
                    }
                    contents.appendChild(lastSaved);
    
                    let lastSavedDescription = document.createElement("div");
                    lastSavedDescription.className = 'last-saved-text';
                    lastSavedDescription.innerHTML = row.sortedProgress[0]?.dateUpdated && row.sortedProgress[0]?.taskId ? '<span class="latest-task">' + task.title + '</span> <br>' +  (new Date(row.sortedProgress[0].dateUpdated.split(' ')[0] + 'T' + row.sortedProgress[0].dateUpdated.split(' ')[1] + 'Z')) : '';
                    contents.appendChild(lastSavedDescription)
                    
                    let bottomRow = document.createElement("div");
                    bottomRow.className = 'bottom-row';
                    
                    if(row.sortedProgress.length > 0){
                        let favorite = document.createElement("div");
                        favorite.innerHTML = '<button id="student' + row.userId + '-task' + row.sortedProgress[0].taskId + '" onclick="window.fv.favoriteRow(' + row.userId + ', ' + row.sortedProgress[0].taskId + ')" class="favorite-button">' + (row.favorite ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>') + '</button>';
                        favorite.style.textAlign = 'center';
                        bottomRow.style.justifyContent = 'space-around';
                        bottomRow.appendChild(favorite);
                    }

                    let openModel = document.createElement("div");
                    openModel.className = 'open-model'
                    if(row.sortedProgress?.length > 0){
                        openModel.innerHTML = '<a href="/dashboard/projects/?journeyId=' + row.sortedProgress[0].journeyId + '&taskId=' + row.sortedProgress[0].taskId + '&studentId=' + row.userId + '">Open Models</a>';
                    }
                    else{
                        openModel.innerHTML = '<a>No Models</a>';
                    }
                
                    bottomRow.appendChild(openModel);
                    contents.appendChild(bottomRow);

                    student.appendChild(contents);
                    gallery.appendChild(student);
                }
            }
        })
    }

    function favoriteRow(studentId, taskId){
        getFavorites((e) => {
            if(_.findWhere(e, {studentId: studentId, taskId: taskId})){
                unfavorite(studentId, taskId, () => {
                    $('#student' + studentId + '-task' + taskId).html('<i class="far fa-star"></i>');
                });

            }
            else{
                favorite(studentId, taskId, () =>{
                    $('#student' + studentId + '-task' + taskId).html('<i class="fas fa-star"></i>');
                });
            }
        });
    }

    function launchClassModal(){
        $('#classes-modal').show(); 
        $('input:checkbox').removeAttr('checked');
    }

    function closeClassModal(){
        $('#classes-modal').load(document.URL + ' #classes-modal-content');
        $('#classes-modal').hide();
    }

    function assignJourneyToAllStudents(){
        let studentIds;
        let journeyIds = $('.journey-checkbox:checkbox:checked').map(function () {
            return parseInt($(this).val());
        }).get();
        getStudents((e)=>{
            studentIds = e.map(a => a.id);
            for(let studentId of studentIds){
                for (let journeyId of journeyIds){
                    createAssignment(studentId, journeyId, closeClassModal);
                }
            }
        });
    }

    function deleteAssignmentForAllStudents(id){
        let studentIds;
        getStudents((e) => {
            studentIds = e.map(a => a.id);
            for (let studentId of studentIds) {
                getAssignments(studentId, (assignments) => {
                    for (let assignment of assignments){
                        if (assignment.journeyId === parseInt(id)){
                            deleteAssignment(assignment.id, ()=>{
                                $('#classes-modal').load(document.URL + ' #classes-modal-content')
                                $('#classes-modal').show();
                            });
                        }
                    }
                });
            }
        });
    }

    function createAssignment(studentId, journeyId, onComplete) {
        var url = generateUrl("create-assignment");
        var data = generateBody({ userId: userId, studentId: studentId, journeyId: journeyId });
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    if(onComplete) onComplete(JSON.parse(result));
                },
                error: onPostError
        });
        return "loading...";
    }

    function updateAssignment(assignmentId, status, onComplete) {
        var url = generateUrl("update-assignment");
        var data = generateBody({ userId: userId, assignmentId: assignmentId, status: status });
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    if(onComplete) onComplete(JSON.parse(result));
                },
                error: onPostError
        });
        return "loading...";
    }

    function deleteAssignment(assignmentId, onComplete) {
        var url = generateUrl("delete-assignment");
        var data = generateBody({ userId: userId, assignmentId: assignmentId });
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    if(onComplete) onComplete(JSON.parse(result));
                },
                error: onPostError
        });
        return "loading...";
    }

    function getAssignments(studentId, onComplete) {
        var url = generateUrl("get-assignments");
        var data = generateBody({ userId: userId, studentId: studentId });
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    if(onComplete) onComplete(JSON.parse(result));
                },
                error: onPostError
        });
        return "loading...";
    }

    function getStudents(onReceipt) {
        var url = generateUrl("get-students");
        var data = generateBody({ userId: userId });
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    if(onReceipt) onReceipt(JSON.parse(result));
                },
                error: onPostError
        });
        return "loading...";
    }

    function getStudentPages(onReceipt) {
        var url = generateUrl("get-student-pages");
        var data = generateBody({ userId: userId });
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    if(onReceipt) onReceipt(JSON.parse(result));
                },
                error: onPostError
        });
        return "loading...";
    }

    function getStudentPage(page,onReceipt) {
        var url = generateUrl("get-student-page");
        var data = generateBody({ userId: userId, page: page });
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    if(onReceipt) onReceipt(JSON.parse(result));
                },
                error: onPostError
        });
        return "loading...";
    }

    function getStudentInfo(studentId, journeyId, taskId, onReceipt) {
        var url = generateUrl("get-student-info");
        var data = generateBody({ userId: userId, studentId: studentId, journeyId: journeyId, taskId: taskId });
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    if(onReceipt) onReceipt(JSON.parse(result));
                },
                error: onPostError
        });
        return "loading...";
    }

    function getStudentsWithInfo(onReceipt, studentIds) {
        var url = generateUrl("get-students-with-info");
        var data = generateBody({ userId: userId, studentIds: studentIds });
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    if(onReceipt) onReceipt(JSON.parse(result));
                },
                error: onPostError
        });
        return "loading...";
    }

    function getAllStudentInfo(){
        getStudents((students) => {
            let studentsObj= [];
            for(let student of students){
                let newStudentObj = Object.assign({}, student, {saved: []});
                for (let journey of window.__ALL_CONTENT__.journeys){
                    for(let task of journey.tasks){
                        getStudentInfo(student.id, journey.id, task.id,(e)=>{
                            newStudentObj.saved = (newStudentObj.saved).concat(e);
                        })
                    }
                }
                studentsObj = studentsObj.concat(newStudentObj)
            }
            return studentsObj;
        });
    }

    function saveEvent(actionType, blockType, workspace) {
        var url = generateUrl("save-event");
        var data = generateBody({userId: userId, journeyId: journeyId, taskId: taskId, 
                        actionType: actionType, blockType: blockType, workspace: workspace });
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    // trace("event saved", result);
                },
                error: onPostError
        });
        return "saving...";
    }

    function saveChartData(charts) {
        var url = generateUrl("save-chart-data");
        var data = generateBody({userId: userId, journeyId: journeyId, taskId: taskId, charts: charts });
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    // trace("charts saved", result);
                },
                error: onPostError
        });
        return "saving...";
    }

    function loadProgress(onSuccess) {
        var url = generateUrl("load-progress");
        var data = generateBody({userId: userId, journeyId: journeyId, taskId: taskId});
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    // trace("progress retrieved", result);
                    if(onSuccess) onSuccess(result);
                },
                error: onPostError
        });
        return "loading...";
    }

    function saveProgress(id, title, progress, image, ggbSettings, graphSettings, onSave) {
        var url = generateUrl("save-progress");
        var data = generateBody({id: id, title: title, userId: userId, journeyId: journeyId, taskId: taskId, progress: progress, image: image, ggbSettings: ggbSettings, graphSettings: graphSettings });
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    trace("progress saved", result);
                    if(onSave) onSave(result);
                },
                error: onPostError
        });
        return "saving...";
    }

    function deleteModel(id, onDelete) {
        var url = generateUrl("delete-model");
        var data = generateBody({id: id, userId: userId});
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    trace("deletion called successfully", result);
                    if(onDelete) onDelete(result);
                },
                error: onPostError
        });
        return "deleting...";
    }

    function favorite(studentId, taskId, onSave) {
        var url = generateUrl("favorite");
        var data = generateBody({ userId: userId, studentId: studentId, taskId: taskId });
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    if(onSave) onSave(result);
                },
                error: onPostError
        });
        return "saving...";
    }

    function unfavorite(studentId, taskId, onSave) {
        var url = generateUrl("unfavorite");
        var data = generateBody({ userId: userId, studentId: studentId, taskId: taskId });
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    if(onSave) onSave(result);
                },
                error: onPostError
        });
        return "saving...";
    }

    function log(message, onSave) {
        var url = generateUrl("log");
        var data = generateBody({ userId: userId, message: message });
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    if(onSave) onSave(JSON.parse(result));
                },
                error: onPostError
        });
        return "saving log...";
    }

    function getFavorites(onReceipt) {
        var url = generateUrl("get-favorites");
        var data = generateBody({ userId: userId });
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    if(onReceipt) onReceipt(JSON.parse(result));
                },
                error: onPostError
        });
        return "retrieving favorites...";
    }

    function getDefaultSettings(onReceipt) {
        var url = generateUrl("get-default-settings");
        var data = generateBody({});
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    if(onReceipt) onReceipt(JSON.parse(result));
                },
                error: onPostError
        });
        return "retrieving default settings...";
    }

    function saveGraph(csv, onReceipt) {
        var url = generateUrl("save-graph");
        var data = generateBody({userId: userId, taskId: taskId, csv: csv});
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    if(onReceipt) onReceipt(JSON.parse(result));
                },
                error: onPostError
        });
        return "saving graph...";
    }

    function deleteGraph(id, onReceipt) {
        var url = generateUrl("delete-graph");
        var data = generateBody({userId: userId, id: id});
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    if(onReceipt) onReceipt(JSON.parse(result));
                },
                error: onPostError
        });
        return "deleting graph...";
    }

    function getGraphs(onReceipt) {
        var url = generateUrl("get-graphs");
        var data = generateBody({userId: userId, taskId: taskId});
        $.ajax({
                url: url,
                type: "post",
                data: JSON.stringify(data),
                contentType: "application/json",
                headers: headers,
                success: function(result) {
                    if(onReceipt) onReceipt(JSON.parse(result));
                },
                error: onPostError
        });
        return "retrieving graphs...";
    }


	function generateUrl(method) {
            return __SERVICE_URL__ + "/" + method;
    }

    function generateHeader() {
            return {"Content-Type": "application/json" ,"X-Requested-With": "XMLHttpRequest"};
    }

    function generateBody(params) {
            var body = {};
            body[__CSRF_TOKEN_NAME__] = __CSRF_TOKEN__;

            for(var prop in params) {
                    body[prop] = params[prop];
            }

            return body;
    }

    function post(url, body) {
        $.ajax({
            url: url,
            type: "post",
            data: JSON.stringify(body),
            contentType: "application/json",
            headers: headers,
            success: onAccountValidation,
            error: onPostError
        });
    }

    function onPostError() {
        console.error("server error");
        console.error(arguments);
    }

	function trace() {
		for(var i = 0, count = arguments.length; i < count; i++) {
			console.log(arguments[i]);
		}
	}

    initialize();

    self.loadProgress = loadProgress;
    self.saveProgress = saveProgress;
    self.deleteModel = deleteModel;
    self.saveChartData = saveChartData;
    self.saveEvent = saveEvent;
    self.getStudents = getStudents;
    self.getStudentInfo = getStudentInfo;
    self.getStudentsWithInfo = getStudentsWithInfo;
    self.getAllStudentInfo = getAllStudentInfo;
    self.createAssignment = createAssignment;
    self.updateAssignment = updateAssignment;
    self.deleteAssignment = deleteAssignment;
    self.getAssignments = getAssignments;
    self.launchClassModal = launchClassModal;
    self.closeClassModal = closeClassModal;
    self.assignJourneyToAllStudents = assignJourneyToAllStudents;
    self.deleteAssignmentForAllStudents = deleteAssignmentForAllStudents;
    self.refreshStudentProjects = refreshStudentProjects;
    self.favorite = favorite;
    self.unfavorite = unfavorite;
    self.getFavorites = getFavorites;
    self.favoriteRow = favoriteRow;
    self.organizeData = organizeData;
    self.fillTableGallery = fillTableGallery;
    self.getStudentPages = getStudentPages;
    self.getStudentPage = getStudentPage;
    self.log = log;
    self.getDefaultSettings = getDefaultSettings;
    self.getGraphs = getGraphs;
    self.saveGraph = saveGraph;
    self.deleteGraph = deleteGraph;
    return self;
}(fv = fv || {}));