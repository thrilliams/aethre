var loaded = false

function main(cards, packs, factions) {
  if (cards && packs && factions) loaded = true
  
  var title = card => (card.uniqueness ? "♦ " : "") + card.title
  var firstCase = string => string.charAt(0).toUpperCase() + string.slice(1)
  var findObj = (array, attr, value) => {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) return array[i]
    }
  }

  var handleIcons = string => {
    if (string) {
      var replacements = [
        ['+1[mu]', '+<span class="icon-1mu"></span>'],
        ['+2[mu]', '+<span class="icon-2mu"></span>'],
        ['+3[mu]', '+<span class="icon-3mu"></span>'],
        ['+X[mu]', '+X<span class="icon-mu"></span>'],
        ['1[mu]', '<span class="icon-1mu"></span>'],
        ['2[mu]', '<span class="icon-2mu"></span>'],
        ['3[mu]', '<span class="icon-3mu"></span>'],
        ['[click]', '<span class="icon-click"></span>'],
        ['[credit]', '<span class="icon-credit"></span>'],
        ['[trash]', '<span class="icon-trash"></span>'],
        ['[link]', '<span class="icon-link"></span>'],
        ['[subroutine]', '<br><span class="icon-subroutine"></span>'],
        ['[recurring-credit]', '<span class="icon-recurring-credit"></span>'],
        ['[anarch]', '<span class="icon-anarch"></span>'],
        ['[criminal]', '<span class="icon-criminal"></span>'],
        ['[shaper]', '<span class="icon-shaper"></span>'],
        ['[nbn]', '<span class="icon-nbn"></span>'],
        ['[jinteki]', '<span class="icon-jinteki"></span>'],
        ['[weyland-consortium]', '<span class="icon-weyland-consortium"></span>'],
        ['[haas-bioroid]', '<span class="icon-haas-bioroid"></span>']
      ]
      for (var i = 0; i < replacements.length; i++) {
        string = string.split(replacements[i][0]).join(replacements[i][1])
      }
      if (string.startsWith('<br>')) string = string.slice(4)
    }
    return string
  }

  var handleStrength = card => {
    if (card.strength) return ' • Strength: ' + card.strength
    if (card.keywords && card.keywords.includes('Icebreaker')) {
      if (card.strength === null) return ' • Strength: X'
      if (card.strength === undefined) return ' • Strength: 0'
    }
    return ""
  }

  var templates = {
    runner: {
      identity: card => `Link: ${card.base_link} • Deck: ${card.minimum_deck_size} • Influence: ${card.influence_limit ? card.influence_limit : "∞"}`,
      event: card => `Cost: ${card.cost ? card.cost : "X"} • Influence: ${card.faction_cost}`,
      hardware: card => `Install: ${card.cost}`,
      program: card => `Install: ${card.cost} • Memory: ${card.memory_cost}${handleStrength(card)}`,
      resource: card => `Install: ${card.cost ? card.cost : "X"}`
    },
    corp: {
      identity: card => `Deck: ${card.minimum_deck_size} • Influence: ${card.influence_limit ? card.influence_limit : "∞"}`,
      agenda: card => `Adv: ${card.advancement_cost} • Score: ${card.agenda_points}`,
      asset: card => `Rez: ${card.cost} • Trash: ${card.trash_cost}`,
      ice: card => `Rez: ${card.cost} • Strength: ${card.strength ? card.strength : "X"}`,
      operation: card => `Cost: ${card.cost ? card.cost : "X"}`,
      upgrade: card  => `Rez: ${card.cost} • Trash: ${card.trash_cost}`
    },
    wrapper: (card, byline) => `
    <div class="card mb-4 mx-auto" style="min-width: 300px; max-width: 300px; min-height: 418px; max-height: 418px;">
      <div class="card-header">
        ${title(card)}
      </div>
      <div class="card-body">
        <p class="card-text">${firstCase(card.type_code) + (card.keywords ? ': ' + card.keywords : "")} • ${byline}${card.faction_cost ? " • Influence: " + card.faction_cost : ""}</p>
        ${card.text ? '<p class="card-text">' + handleIcons(card.text) + '</p>' : ""}
        <small>
          ${card.flavor ? '<p class="card-text font-italic">' + card.flavor + '</p>' : ""}
          <p class="card-text">${findObj(factions, 'code', card.faction_code).name + (card.illustrator ? ' • ' + card.illustrator : "")} • ${findObj(packs, 'code', card.pack_code).name} ${card.position}</p>
        </small>
      </div>
    </div>
    `
  }

  function search(e) {
    if (e) e.preventDefault()
    var key = document.getElementById('searchtype')
    key = key.options[key.selectedIndex].value
    var value = document.getElementById('searchquery').value
    var results = cards.filter(checkCard)

    function checkCard(card) {
      try {
        return card[key].toLowerCase().includes(value.toLowerCase())
      } catch (err) {
        console.log(err)
      }
    }

    results = results.sort(function(a, b) {
      if (a.code < b.code) return -1
      if (a.code > b.code) return 1
      return 0
    })

    displayCards(results)
  }

  function displayCards(data) {
    var html = ''

    for (var i = 0; i < data.length; i++) {
      html += templates.wrapper(data[i], templates[data[i].side_code][data[i].type_code](data[i]))
    }

    html = `
    <div class="row">
      <div class="card-deck">
        ${html}
      </div>
    </div>
    `
    document.getElementById('cardholder').innerHTML = html
  }

  document.getElementById('search').addEventListener('submit', search)
  search()
}

var script = document.createElement('script');
script.onload = function () {
  if (!loaded) {
    main(fallback.cards, fallback.packs, fallback.factions)
  }
}
script.src = 'data.js';
document.head.appendChild(script); //or something of the likes

nrdb.critical(main)
