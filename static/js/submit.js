var path = window.location.pathname;
var image_link;
var image_file;
var nodeList = path.split('/')

var teacher_id = nodeList[3];
var class_name = nodeList[4];
var assignment_name = nodeList[5];

class_name = class_name.replaceAll('%20', ' ');
assignment_name = assignment_name.replaceAll('%20', ' ');

if (typeof screen.orientation == 'undefined') {
  window.location.replace(`/student/submit/mobile/${teacher_id}/${class_name}/${assignment_name}`)
}

function display_assignment_info() {
    let assignment_name_text = document.getElementById("assignments_text");
    assignment_name_text.innerHTML = assignment_name;

    let classes_text = document.getElementById("classes_text");
    classes_text.innerHTML = class_name;
}


function save_image() {
    let file_input = document.getElementById("assignment_upload");
    let file = file_input.files[0];
    let reader = new FileReader();
    image_file = file;
    reader.addEventListener("load", () => {

        image_link = reader.result;
      }, false);
    
      if (file) {
        reader.readAsDataURL(file);
        file_input.parentNode.innerHTML = "<input type=\"file\" id=\"assignment_upload\" onchange=\"save_image();\"/><i class=\"fa fa-check\"></i> Uploaded!"
      }


}
function show_data_prior_to_submission() {
    let first_name = document.getElementById("first_name").value;
    let last_name = document.getElementById("last_name").value;
    let class_password = document.getElementById("class_password").value;
    let student_id = document.getElementById("student_id").value;
    let name_text = document.getElementById("name_text");
    let class_password_text = document.getElementById("class_password_text");
    let student_id_text = document.getElementById("student_id_text");
    let image_display = document.getElementById("assignment_image");
    let modal = document.getElementById("pre_submit_modal");

    modal.style.display = "block";
    name_text.innerHTML = "Name: " + last_name + ", " + first_name;
    student_id_text.innerHTML = "Student ID: " + student_id;
    class_password_text.innerHTML = "Class Password: " + class_password;

    image_display.src = image_link;
}

function submit_assignment() {
    const next_button = document.getElementById("open_submit_details");
    let content = {"teacher_id": teacher_id,
      "class_name": class_name,
      "assignment_name" : assignment_name,
      "first_name" : document.getElementById("first_name").value,
      "last_name" : document.getElementById("last_name").value,
      "student_id" : document.getElementById("student_id").value,
      "class_password" : document.getElementById("class_password").value,
      "assignment_image" : image_link
                };
    
    let submit_request = new XMLHttpRequest();
    submit_request.open("POST", '/submit', true);
    submit_request.setRequestHeader('accept', 'application/json, text/plain, */*');
    submit_request.setRequestHeader('accept_language', 'en-US,en;q=0.9');
    submit_request.setRequestHeader('content-type', 'application/json');
    
    submit_request.onreadystatechange = () => {
        if (submit_request.readyState === XMLHttpRequest.DONE && submit_request.status === 200) {
        }
      }

    submit_request.send(JSON.stringify(content));
    
    next_button.innerHTML = "<i class=\"fa fa-check\"></i> Submitted!"

    document.getElementById('pre_submit_modal').style.display='none'
}