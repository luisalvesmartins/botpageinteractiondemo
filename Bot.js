var scenario;
scenario = {
        Palette: [
            { text: "Start", figure: "Circle", fill: "#00AD5F", type: "START" },
            { text: "Input", type: "INPUT" },
            { text: "Choice", figure: "RoundedRectangle", fill: "#eeee00", type: "CHOICE" },
            { text: "???", figure: "Diamond", fill: "lightskyblue", type: "IF" },
            { text: "Message", figure: "Rectangle", fill: "burlywood", type: "MESSAGE" },
            { text: "LUIS", figure: "Rectangle", fill: "lightgreen", type: "LUIS" },
            { text: "QNA", figure: "Rectangle", fill: "#77CC77", type: "QNA" },
            { text: "Azure Search", figure: "Rectangle", fill: "#77DD77", type: "SEARCH" },
            { text: "Card", type: "CARD", fill: "lightyellow" },
            { text: "API", figure: "Rectangle", fill: "#FF7777", type: "API" },
            { text: "Reset Var", type: "RESETVAR", figure: "Rectangle", fill: "#FF7777" },
            { text: "EVENT", type: "EVENT", figure: "Rectangle", fill: "#FF7777" },
            { text: "REST\nCall", figure: "Rectangle", fill: "#FF7777", type: "REST" },
            { text: "Dialog", type: "DIALOG", figure: "Rectangle", fill: "#00AA3F" },
            { text: "Start\nDialog", figure: "Circle", fill: "#00AA3F", type: "DIALOGSTART"},
            { text: "End\nDialog", figure: "Circle", fill: "#00AA3F", type: "DIALOGEND" },
        ],
        Fields: [
            {
                type: "API",
                Fields: [{ name: "parVar" }, { name: "parAPI" }, { name: "parPar" }, { name: "parAPO" }],
                waitForUserInput: "false"
            },
            {
                type: "CARD",
                Fields: [{ name: "parVar" }, { name: "parCar" }, { name: "parCrd" },
                { name: "parTra", default: "Yes", title: 'Wait for user action' },
],
                waitForUserInput: "true"
            },
            {
                type: "CHOICE",
                Fields: [{ name: "parVar" }, { name: "parTro"}],
                waitForUserInput: "true",
                needValidChoice: "true"
            },
            {
                type: "DIALOG",
                Fields: [{ name: "parAPI", title: "Dialog Name" }],
                waitForUserInput: "false",
                showMessage:"false"
            },
            {
                type: "IF", Fields: [{ name: "parCon" }],
                waitForUserInput: "false",
                showMessage:"false"
            },
            {
                type: "INPUT", Fields: [
                    { name: "parVar" }, 
                    { name: "parTyp" }, 
                    { name: "parCkv" }, 
                    { name: "parTra" }, { name: "parTro"}],
                waitForUserInput: "true"
            },
            {
                type: "LUIS", Fields: [{ name: "parVar" },
                { name: "parTra" },
                { name: "parTro"},
                { name: "parURL", default: "https://westus.api.cognitive.microsoft.com/" },
                { name: "parKey", default: "authoringkey", title: 'Authoring Key' },
                { name: "parPar", default: "guid", title: 'Appliaction Id' },
                { name: "parLMI", default: "0.5" },
                { name: "parCkv" }],
                waitForUserInput: "true",
                needValidChoice: "true"
            },
            {
                type: "MESSAGE", Fields: [
                { name: "parTro"},
                ],
                waitForUserInput: "false"
            },
            {
                type: "QNA", Fields: [{ name: "parVar" },
                { name: "parTra" },                        
                { name: "parTro"},
                { name: "parURL", default: "https://yourdeployment.azurewebsites.net/qnamaker" },
                { name: "parKey", title: "EndpointKey", default: "guid" },
                { name: "parPar", title: "Knowledgebase", default: "guid" },
                { name: "parCkv" }, 
                ],
                waitForUserInput: "true"
            },
            {
                type: "SEARCH", Fields: [{ name: "parVar" },
                    { name: "parTra" },                        
                    { name: "parTro"},
                    { name: "parTx0", title: "Service Name"  },
                    { name: "parKey", title: "Service Key", default: "" },
                    { name: "parTx1", title: "Index Name", default: "" },
                    { name: "parAPI", title: "Title Field", default: "" },
                    { name: "parTyp", title: "Text Field", default: "" },
                    { name: "parPar", title: "Filter", default: "" },
                ],
                waitForUserInput: "true"
            },
            {
                type: "RESETVAR", Fields: [{ name: "parVar", title: "List of variables to erase separated by comma" }],
                waitForUserInput: "false",
                showMessage:"false"
            },
            {
                type: "EVENT", Fields: [{ name: "parVar", title: "Event Name" },{ name: "parPar", title: "Event Data" }],
                waitForUserInput: "false",
                showMessage:"true"
            },
            {
                type: "START", Fields: [
                { name: "parVar", title:"Variable with Current Language", default:"CURRENT_LANGUAGE"},
                { name: "parTra", title:"Use Translation Services"},
                { name: "parKey", title:"Translation Services Key"},
                { name: "parAPI", title:"Internal Language", default:'en-US'},
                ],
                waitForUserInput: "false"
            },
            {
                type: "REST", Fields: [{ name: "parVar" },
                { name: "parPar", title: "REST CALL", default: "POST http://url.com\nAUTHORIZATION: Basic XXX\n\n{data:''}" },
                { name: "parKey", title: "Response XPath", default: "//result" },
                { name: "parAPO", title: "Output" },  
                { name: "parCrd", title:"Card - use ${xpath to field}",default:'{"contentType":"application/vnd.microsoft.card.hero","content":{"title":"${title}","text":"${text}","images":[],"buttons":[{"type":"postBack","title":"button","value":"buttonvalue"}]}}' }
                ],
                waitForUserInput: "false",
                showMessage:"false"
            },
            {
                type: "DIALOGSTART",
                Fields: [],
                waitForUserInput: "false",
                showMessage:"false"
            },
            {
                type: "DIALOGEND",
                Fields: [],
                waitForUserInput: "false",
                showMessage:"false"
            },
        ]
    }

var Bot = {
    actualStepKey:0,
    flow:[],
dialogstack:[],
messageID: 0,
lastActivity: null,
key: 0,
translator:null,
sendMessage: function (text, extension) {
Bot.messageID++;
var message = {
activities: [Object.assign({
  "conversation": {
    "id": "something"
  },
  "id": Bot.messageID,
  "from": {
    "id": "something",
    "name": "someone",
    "role": "bot"
  },
  "recipient": {
    "id": "something",
    "name": "me",
    "role": "user"
  },
  "text": text,
  "say": text,
  "timestamp": "2018-10-18T15:21:07.82108Z",
  "type": "message",
  "channelId": "web"
}, extension)]
};
DirectLineEmulator.emptyActivity = message;
},
userData: {},
receiveMessage: function (activity) {
if (activity != Bot.lastActivity) {
  Bot.processMessage(activity);
  Bot.lastActivity = activity;
}
},
processMessage(activity){
//MOVE NEXT
//LOOK AT 
//var selectedDialog=Tab.Tabs[Tab.Selected];
if (Bot.actualStepKey!="") {
var flow = Bot.flow.flow;
var condition = false;
var key = Bot.actualStepKey;
var a = searchArray(flow, key, "key")
var toLang="";

var userText=activity.text;
if (a.parVar) {
  Bot.userData[a.parVar] = userText;
}

if (Bot.translator!=null)
{
  //console.log(Bot.translator)
  toLang=Bot.userData[Bot.translator.variable];
  if (a.parTra=="Yes"){
    userText=translate(Bot.translator.key, userText, toLang, Bot.translator.to);
    if (a.parVar) {
      Bot.userData[a.parVar + "_" + toLang] = userText;
    }
  }
}

var topScoringIntent = "None";
if (a.type == "LUIS") {
  //DO THE CALL
  var LUISResult = undefined;
  try {
    var url = a.parURL + "/luis/v2.0/apps/" + a.parPar + "?subscription-key=" + a.parKey + "&q=" + userText;
    var res = $.get({ url: url, async: false }).responseText;
    LUISResult = JSON.parse(res);
  } catch (error) {
    alert("ERROR IN LUIS PARAMETERS");
  }
  if (LUISResult) {
    topScoringIntent = LUISResult.topScoringIntent.intent;
    if (LUISResult.sentimentAnalysis) {
      Bot.userData[a.parVar + ".sentiment.label"] = LUISResult.sentimentAnalysis.label;
      Bot.userData[a.parVar + ".sentiment.score"] = LUISResult.sentimentAnalysis.score;
    }
    LUISResult.entities.forEach(element => {
      Bot.userData[a.parVar + "." + element.type] = element.entity;
    });
  }
  if (document.all("chkLUISDebug").checked) {
    LUISDebug(a, LUISResult);
  }
}
var extension=null;
if (a.type == "SEARCH") {
  //DO THE CALL
  var SearchResult = undefined;
  try {
    var url = "https://" + a.parTx0 + ".search.windows.net/indexes/" + a.parTx1 + "/docs?search=" + encodeURI(userText) + "&api-version=2019-05-06&api-key=" + a.parKey;
    var res = $.get({
      url: url,
      async: false
    }).responseText;
    SearchResult = JSON.parse(res);
  } catch (error) {
    alert("ERROR IN SEARCH PARAMETERS");
  }
  if (SearchResult.value.length>0) {
    var at=[];
    for (let index = 0; index < SearchResult.value.length; index++) {
      const element = SearchResult.value[index];
      at.push(
        {
        "content": {
          "title": element[a.parAPI],
          "text": element[a.parTyp]
        },
        "contentType": "application/vnd.microsoft.card.hero"
        }
      );
        extension={"attachments":
          at, "attachmentLayout":"carousel" 
        };
      }
    //console.log(extension);

    if (a.parVar) {
      Bot.userData[a.parVar + "_Result"] = SearchResult;
    }
  }
}
var messages = [];
var bailout=0;
do {
  //console.log("A.TYPE:" + a.type)

  if (a.type == "QNA") {
    //DO THE CALL
    var QNAResult = undefined;
    try {
      var url = a.parURL + "/knowledgebases/" + a.parPar + "/generateAnswer";
      var headers = { "Authorization": "EndpointKey " + a.parKey, "Content-Type": "application/json" };
      var res = $.post({
        url: url,
        headers: headers,
        async: false,
        data: "{\"question\":\"" + encodeURI(userText) + "\"}"
      }).responseText;
      QNAResult = JSON.parse(res);
    } catch (error) {
      alert("ERROR IN QNA PARAMETERS");
    }
    if (QNAResult) {
      topScoringIntent = QNAResult.answers[0].answer;

      if (QNAResult.answers[0].context){
        var prompts=QNAResult.answers[0].context.prompts;
        if (prompts!=null){
          var buttons=[];
          for (let index = 0; index < prompts.length; index++) {
            const element = prompts[index].displayText;
            buttons.push(
              {
                "title": element,
                "type": "imBack",
                "value": element
              }
            );
          }

          if (buttons.length>0)
            extension={"attachments":
              [
                {
                  "content": {
                    "buttons": buttons,
                    "text": topScoringIntent
                  },
                  "contentType": "application/vnd.microsoft.card.hero"
                }
              ]
            };
        }
      }

      if (a.parVar) {
        Bot.userData[a.parVar + "_QNAResult"] = escape(JSON.stringify(QNAResult.answers[0]));
        Bot.userData[a.parVar + "_Result"] = topScoringIntent;
      }
    }
  }

  bailout++;
  condition = false;
  var text = userText;
  if (a.type == "IF") {
    text = Bot.ReplacePragmas(a.parCon)
    // console.log("IF");
    // console.log(text);
    text = eval(text).toString();
    // console.log("RESULT");
    // console.log(text);
  }
  if (a.type == "LUIS") {
    text = topScoringIntent;
  }
  if (a.type == "QNA") {
    if (extension!=null)
    {
      messages.push({ type: "MESSAGE", text:"",extension:extension });
      Bot.sendBotMessage(messages);
      return;
    }
    else
      messages.push({ type: "MESSAGE", text: topScoringIntent });
  }
  if (a.type == "SEARCH") {
    if (extension!=null)
    {
      messages.push({ type: "MESSAGE", text:"",extension:extension});
      Bot.sendBotMessage(messages);
    }
    else
      messages.push({ type: "MESSAGE", text: "No records found" });
  }
  if (a.type=="REST")
  {
    //REST= a
    var post = Bot.ReplacePragmas(a.parPar);
    var returnValue=RESTCall(post);
    var dom = jsel(JSON.parse(returnValue));

    //FILTER= a.parKey
    var results=dom.selectAll(a.parKey);
    var extension="";
    for (let index = 0; index < results.length; index++) {
        const element = results[index];

        var dom2 = jsel(element);

        //SEARCH a.parCrd for ${}
        var crd=a.parCrd;
        var p=1;
        while(p>0) {
          p=crd.indexOf("${");
          if (p>=0)
          {
            var pd=crd.indexOf("}",p);
            var field=crd.substring(p+2,pd);

            var text=dom2.select(field);

            crd=crd.substring(0,p) + text + crd.substring(pd+1);
          }
        }

        if (extension!="")
            extension+=","
        extension+=crd;
    }
    extension="[" + extension + "]";

    messages.push({ type: "REST", text: "", attachmentLayout:"carousel", extension:{ "attachments": JSON.parse(extension) } });
  }
  if (a.type=="START"){
    if (a.parTra=="Yes"){
      Bot.translator={key:a.parKey, to:a.parAPI, variable:a.parVar};
    }
    else
      Bot.translator=null;
  }
  if (a.type=="DIALOGEND")
  {
    //RETURN TO PREVIOUS DIALOG
    var currentPos=Bot.dialogstack.pop();
    Tab.sel(currentPos.previousTab);
    //find currentPos.key
    var goto = searchArray(flow, currentPos.key, "key");
    a.next=goto.next;
    Bot.actualStepKey=currentPos.key;
    //myDiagram.select(myDiagram.findNodeForKey(currentPos.key));
  }

  var FieldDefinition=Bot.GetTypeDefinition(a.type)

  var nxt = Bot.getNext(a.next, text);
  //CHECK INVALID CHOICE
  if (!nxt && FieldDefinition.needValidChoice=="true")
  {
    nxt=a.key;
  }
  if (activity.playStep)
  {
    activity.playStep=null;
    nxt=Bot.flow[0];//myDiagram.selection.first().key;
  }
  if (nxt) {
    var goto = searchArray(flow, nxt, "key")
    var FieldDefinition=Bot.GetTypeDefinition(goto.type)
    var bSendMessage = true;
    if (FieldDefinition.showMessage=="false")
      bSendMessage = false;
    if (goto.type == "INPUT") {
      if (goto.parCkv == "No" && Bot.userData[goto.parVar]) {
        bSendMessage = false;
        condition = true;
      }
    }
    if (goto.type == "QNA") {
      if (goto.parCkv == "No" && Bot.userData[goto.parVar]) {
        bSendMessage = false;
        condition = true;
      }
    }

    if (goto.type == "DIALOG") {
      var tabSel=Tab.getTabIndexFromName(goto.parAPI);
      if (tabSel==-1)
      {
        goto.text = "ERROR: Couldn't find Dialog " + goto.parAPI;
        messages.push(goto);
      }
      else{
        var currentTab=Tab.selected;
        Tab.sel(tabSel);

        var bFound=false;
        for (let index = 0; index < flow.length; index++) {
          const element = flow[index];
          if (element.dialog==goto.parAPI && element.type=="DIALOGSTART")
          {
            nxt=element.key;
            bFound=true;
            //ADD TO THE DIALOG STACK
            Bot.dialogstack.push({dialog:a.dialog, key:goto.key, previousTab:currentTab});

            break;
          }
        }
        if (!bFound)
        {
          goto.text = "ERROR: No Start Dialog activity found!";
          messages.push(goto);
        }
      }
    }
    if (goto.type == "RESETVAR") {
      var a = goto.parVar.split(",");
      for (let index = 0; index < a.length; index++) {
        const element = a[index];
        delete Bot.userData[element];
      }
    }

    if (bSendMessage) {
      if (goto.parTro=="Yes" && Bot.translator)
      {
        goto.text=translate(Bot.translator.key, goto.text, Bot.translator.to,toLang);
      }
      messages.push(goto);
    }

    Bot.actualStepKey=nxt;
    //myDiagram.select(myDiagram.findNodeForKey(nxt));

    var a = searchArray(flow, nxt, "key")
    FieldDefinition=Bot.GetTypeDefinition(a.type)
    if (FieldDefinition.waitForUserInput!="true")
      condition = true;
    if (a.type=="CARD")
    {
      if (a.parTra=="No"){
        condition=true;
      }
    }
  }
  else {
    messages.push({ type: "MESSAGE", text: "<end of flow>" });
  }
} while (condition && bailout<100);
//$("#userdatavalue").html(JSON.stringify(Bot.userData));
Bot.sendBotMessage(messages);
}
else {
Bot.sendMessage("Design flow and then interact with it");
}

},
getNext: function (nextOptions, message) {
//TODO: evaluate nextOption
if (nextOptions.length <= 0) {
return undefined;
}
else
if (nextOptions.length == 1) {
  return nextOptions[0].to;
}
else {
  for (let i = 0; i < nextOptions.length; i++) {
    const element = nextOptions[i];

    if (element.text == message) {
      return element.to;
    }
  }
  return undefined;
}
},
sendBotMessage(flowItems) {
//TODO: render message based on the type
var activities = [];
for (let i = 0; i < flowItems.length; i++) {
const flowItem = flowItems[i];
var attachmentLayout="";

var extension=flowItem.extension;
switch (flowItem.type) {
  case "CARD":
    flowItem.text = "";
    switch (flowItem.parCar) {
      case "carousel":
        var cardText = Bot.ReplacePragmas(flowItem.parCrd);
        extension = { "attachments": JSON.parse(flowItem.parCrd) };
        attachmentLayout="carousel";
        break;
      case "adaptiveCard":
        var cardText = Bot.ReplacePragmas(flowItem.parCrd);

        extension = {
          "attachments": [
            {
              "contentType": "application/vnd.microsoft.card.adaptive",
              "content": JSON.parse(cardText)
            }
          ]
        };
        break;
      default:
        extension = { "attachments": [JSON.parse(flowItem.parCrd)] };
        break;
    }
    break;
  case "CHOICE":
    var actions = [];
    flowItem.next.forEach(element => {
      var t = Bot.ReplacePragmas(element.text);
      actions.push({ title: t, type: "imBack", value: t });
    });
    extension = { "suggestedActions": { "actions": actions } };
    break;
  case "IF":
    break;
  case "LUIS":
    break;
  case "REST":
    attachmentLayout=flowItem.attachmentLayout;
    extension=flowItem.extension;
    break;
  default:
    break;
}

Bot.messageID++;
var t = Bot.ReplacePragmas(flowItem.text);
var eventData = Bot.ReplacePragmas(flowItem.parPar);
if (flowItem.type=="EVENT"){
  console.log("FLOW")
  console.log(flowItem)
  activities.push(Object.assign({
    "conversation": {
      "id": "something"
    },
    "id": Bot.messageID,
    "from": {
      "id": "something",
      "name": "someone",
      "role": "bot"
    },
    "recipient": {
      "id": "something",
      "name": "me",
      "role": "user"
    },
    "timestamp": (new Date).toISOString(),
    "type": "event",
    "name":flowItem.parVar,
    "data":eventData,
    "channelId": "web",
  },null));
  console.log(activities)
}
else
{
  activities.push(Object.assign({
    "conversation": {
      "id": "something"
    },
    "id": Bot.messageID,
    "from": {
      "id": "something",
      "name": "someone",
      "role": "bot"
    },
    "recipient": {
      "id": "something",
      "name": "me",
      "role": "user"
    },
    "text": t,
    "timestamp": (new Date).toISOString(),
    "type": "message",
    "attachmentLayout":attachmentLayout,
    "channelId": "web",
  }, extension));
}

var message = { activities: activities };
}
DirectLineEmulator.emptyActivity = message;
},
    ReplacePragmas: function (text) {
        if (text==null)
            return "";
        for (var attrname in Bot.userData) {
        text = text.replace("{" + attrname + "}", Bot.userData[attrname]);
        }
        return text;
    },
    GetTypeDefinition:function(dataType) {
        if (scenario) {
            for (let index = 0; index < scenario.Fields.length; index++) {
            const element = scenario.Fields[index];
            if (element.type == dataType)
            return element;
            }
        }
        return [];
    }    
}
function replaceAll(text, search, replacement) {
    text += "";
    return text.replace(new RegExp(search, 'g'), replacement);
};
function searchArray(myArray, nameKey, prop,dialog) {
    if (!dialog)
        dialog="Main";
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i][prop].toString() === nameKey.toString() && myArray[i]["dialog"]==dialog) {
            return myArray[i];
        }
    }
}

