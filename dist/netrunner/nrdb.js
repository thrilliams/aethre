nrdb = {
  json: function(url, callback) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(JSON.parse(xmlHttp.responseText).data[0]);
    };

    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
  },
  jsonarr: function(url, callback) {
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(JSON.parse(xmlHttp.responseText).data);
    };

    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
  }

};

/****Card****/
nrdb.card = function(id, callback) {
  nrdb.json('https://netrunnerdb.com/api/2.0/public/card/' + id, callback);
};

nrdb.cards = function(callback) {
  nrdb.jsonarr('https://netrunnerdb.com/api/2.0/public/cards', callback);
};
/************/


/***Cycle****/
nrdb.cycle = function(id, callback) {
  nrdb.json('https://netrunnerdb.com/api/2.0/public/cycle/' + id, callback);
};

nrdb.cycles = function(callback) {
  nrdb.jsonarr('https://netrunnerdb.com/api/2.0/public/cycles', callback);
};
/************/


/**Decklist**/
nrdb.decklist = function(id, callback) {
  nrdb.json('https://netrunnerdb.com/api/2.0/public/decklist/' + id, callback);
};

nrdb.decklist.byDate = function(date, callback) {
  nrdb.jsonarr('https://netrunnerdb.com/api/2.0/public/decklists/by_date/' + date, callback);
};
/************/


/**Faction***/
nrdb.faction = function(id, callback) {
  nrdb.json('https://netrunnerdb.com/api/2.0/public/faction/' + id, callback);
};

nrdb.factions = function(callback) {
  nrdb.jsonarr('https://netrunnerdb.com/api/2.0/public/factions', callback);
};
/************/


/****MWL*****/
nrdb.mwl = function(callback) {
  nrdb.jsonarr('https://netrunnerdb.com/api/2.0/public/mwl', callback);
};
/************/


/****Pack****/
nrdb.pack = function(id, callback) {
  nrdb.json('https://netrunnerdb.com/api/2.0/public/pack/' + id, callback);
};

nrdb.packs = function(callback) {
  nrdb.jsonarr('https://netrunnerdb.com/api/2.0/public/packs', callback);
};
/************/


/**Prebuilt**/
nrdb.prebuilts = function(callback) {
  nrdb.jsonarr('https://netrunnerdb.com/api/2.0/public/prebuilts', callback);
};
/************/


/****Side****/
nrdb.side = function(id, callback) {
  nrdb.json('https://netrunnerdb.com/api/2.0/public/side/' + id, callback);
};

nrdb.sides = function(callback) {
  nrdb.jsonarr('https://netrunnerdb.com/api/2.0/public/sides', callback);
};
/************/


/****Type****/
nrdb.type = function(id, callback) {
  nrdb.json('https://netrunnerdb.com/api/2.0/public/type/' + id, callback);
};

nrdb.types = function(callback) {
  nrdb.jsonarr('https://netrunnerdb.com/api/2.0/public/types', callback);
};
/************/

nrdb.critical = function(callback) {
  var ready = [false, false, false];
  nrdb.cards(cards => {
    ready[0] = cards;
    if (ready[0] && ready[1] && ready[2]) callback(...ready)
  })
  nrdb.packs(packs => {
    ready[1] = packs;
    if (ready[0] && ready[1] && ready[2]) callback(...ready)
  })
  nrdb.factions(factions => {
    ready[2] = factions;
    if (ready[0] && ready[1] && ready[2]) callback(...ready)
  })
}