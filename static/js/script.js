const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('real-file-input');
const fileNameDisplay = document.getElementById('selected-file-name');
const convertBtn = document.getElementById('convert-btn');
const delBtn = document.getElementById('delete-file-btn');


uploadBtn.addEventListener('click', function(){
    fileInput.click();
});

fileInput.addEventListener('change', function(){
    if(fileInput.files.length>0){
        fileNameDisplay.textContent = "Selected: "+ fileInput.files[0].name;
        fileNameDisplay.style.color = "green";
        convertBtn.disabled = false;
        delBtn.style.display = "block"

    } else {
        resetFileSelection();
    }
});

delBtn.addEventListener('click', function(e){
    e.stopPropagation();
    resetFileSelection();
});

function resetFileSelection(){
    fileInput.value = "";
    delBtn.style.display = "none"
    fileNameDisplay.textContent = "No Chosen File";
    fileNameDisplay.style.color = "red"
    convertBtn.disabled = true;

}