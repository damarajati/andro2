
function localCallback()
{
    generateQuestsList();

}

function generateQuestsList()
{
    var quests = getQuests();
    if (quests) {
        $('.list-group').html('');
        for (var i in quests) { console.log(questTemplate);
            var questTemplate = $('.quest-model .list-group-item').clone();
            currentQuest = quests[i];
            questTemplate.find('h4').text(currentQuest.title + ' - ' + currentQuest.exp + ' EXP');
            questTemplate.find('p').html(currentQuest.descr);
            console.log(currentQuest.done);
            if (currentQuest.done) {
                questTemplate.addClass('active');
            }
            $('.list-group').append(questTemplate);
        }
    }
}