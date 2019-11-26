Survey.StylesManager.applyTheme("bootstrap");

var surveyJSON = {"completedHtml":"<div id=\"container\">\n</div>","pages":[{"name":"page1","elements":[{"type":"rating","name":"question1","title":"How would you rank your current knowledge of Disney Parks and Resorts? (1 - poor, 5 - excellent)"},{"type":"rating","name":"question2","title":"How proficient are you with Microsoft Office products? (1 - poor, 5 - excellent)"},{"type":"rating","name":"question3","title":"What is the HIGHEST education level you have COMPLETED?","rateValues":[{"value":1,"text":"None of these"},{"value":2,"text":"High School / GED"},{"value":3,"text":"Bachelor's Degree"},{"value":4,"text":"Master's Degree"},{"value":5,"text":"Doctorate Degree"}]},{"type":"boolean","name":"question4","title":"Do you have experience in highly technical fields? (I.E. Networking, Programming, Data Analysis, Etc.)","labelTrue":"Yes","labelFalse":"No"},{"type":"rating","name":"question5","title":"How comfortable are you with interacting with strangers on a daily basis?"}]}]}








var Jobs = [
	{
	"Title": "Sr. Marketing Insights Analyst",
	"Description": "This role within CIMA will coordinate efforts to influence Marketing and Media spend to generate the highest Return on Investment possible.",
	"DisneyKnowledge": 1,
	"MicrosoftOffice": 4,
	"EducationLevel": 2,
	"Technology": true,
	"Strangers": 3
	, "Include": true },
	{
	"Title": "Medical Assistant",
	"Description": "The Medical Assistant will maintain effective communication with peers, leaders and associates as well as ensure Health Services leadership remains apprised and updated on pertinent matters requiring attention.",
	"DisneyKnowledge": 3,
	"MicrosoftOffice": 4,
	"EducationLevel": 1,
	"Technology": false,
	"Strangers": 5
	, "Include": true },
	{
	"Title": "Housekeeping- Part-Time, Disney's Vero Beach Resort",
	"Description": "Our Housekeeping Hosts and Hostesses help bring those dreams to life by creating special memories and a home-away-from-home experience for each of our guests every day.",
	"DisneyKnowledge": 1,
	"MicrosoftOffice": 1,
	"EducationLevel": 1,
	"Technology": false,
	"Strangers": 2
	, "Include": true },
	{
	"Title": "Tax Coordinator",
	"Description": "The Income tax group is responsible for the preparation, filing, and audit of all US Income tax returns as well as certain informational returns, including W-9/W-8/Residency Certificates.",
	"DisneyKnowledge": 1,
	"MicrosoftOffice": 5,
	"EducationLevel": 2,
	"Technology": true,
	"Strangers": 1
	, "Include": true },
	{
	"Title": "Expeditor",
	"Description": "The Expeditor provides direct support to assigned Disney Cruise Line Ship, and the Island.",
	"DisneyKnowledge": 3,
	"MicrosoftOffice": 4,
	"EducationLevel": 3,
	"Technology": false,
	"Strangers": 2
	, "Include": true },
	{
	"Title": "Aquarist (The Seas)",
	"Description": "Aquarists are responsible for husbandry of the aquatic animal collections at EPCOT in concert with Senior Aquarists and under the direction and supervision of the Animal Care Management Team.",
	"DisneyKnowledge": 1,
	"MicrosoftOffice": 2,
	"EducationLevel": 2,
	"Technology": false,
	"Strangers": 4
	, "Include": true },
	{
	"Title": "Occupational Registered Nurse",
	"Description": "The Occupational Registered Nurse will provide nursing assessment, treatment and recommendations to Cast Members related to illness or injury of Cast Members, within their Scope of Practice.",
	"DisneyKnowledge": 1,
	"MicrosoftOffice": 2,
	"EducationLevel": 3,
	"Technology": false,
	"Strangers": 5
	, "Include": true },
	{
	"Title": "Marketing Specialist (CT)",
	"Description": "The Marketing Specialist (CT), under guidance from the Manager, coordinates the timely distribution of Disney University Marketing messages, ensuring accuracy, aesthetic appeal, and user-friendly navigation of Disney University interactive communications",
	"DisneyKnowledge": 3,
	"MicrosoftOffice": 3,
	"EducationLevel": 2,
	"Technology": false,
	"Strangers": 1
	, "Include": true },
	{
	"Title": "Account Manager, Talent Acquisition Marketing (Project Hire)",
	"Description": "The Account Manager, Talent Acquisition Marketing will be responsible for the development and execution of marketing strategies on behalf of the recruitment organization across The Walt Disney Company and its affiliates.",
	"DisneyKnowledge": 3,
	"MicrosoftOffice": 3,
	"EducationLevel": 3,
	"Technology": false,
    "Strangers": 3,
    "Include": true 
	}
]

var final = []


function sendDataToServer(survey) {
    //send Ajax request to your web server.
    //alert("The results are:" + JSON.stringify(survey.data.question1));
    Jobs.forEach(function(element){
        if(element.DisneyKnowledge > survey.data.question1){
            element.Include = false;
        }
        if(element.MicrosoftOffice > survey.data.question2){
            element.Include = false;
        }
        if(element.EducationLevel > survey.data.question3){
            element.Include = false;
        }
        if(survey.data.question4 == false){
            if(element.Technology == true){
                element.Include = false;
            }
        }
        if(element.Strangers > survey.data.question5){
            element.Include = false;
        }
    })
    Jobs.forEach(function(element){
        if(element.Include == true){
            var holder = {"Title": element.Title,"Description": element.Description}
            final.push(holder)
        }
    })
    console.log(survey.data)
    console.log(final)
    var rows = final;
 var html = '<table class="table table-striped ">';
 html += '<tr>';
 for( var j in rows[0] ) {
  html += '<th>' + j + '</th>';
 }
 html += '</tr>';
 for( var i = 0; i < rows.length; i++) {
  html += '<tr>';
  for( var j in rows[i] ) {
    html += '<td>' + rows[i][j] + '</td>';
  }
  html += '</tr>';
 }
 html += '</table>';
 document.getElementById('container').innerHTML = html;
}

var survey = new Survey.Model(surveyJSON);
$("#surveyContainer").Survey({
    model: survey,
    onComplete: sendDataToServer
});
