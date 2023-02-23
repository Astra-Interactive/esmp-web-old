

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = 10000 + "px";
        }
    });
}



$('#create').click(function () {
    $('.modal').toggleClass("show");
    $('.show-btn').removeClass("disabled");
});
$('.close-btn').click(function () {
    $('.imgCommand').html('');
    $('.modal').toggleClass("show");
    $('.show-btn').removeClass("disabled");
});










item_unique_id = null;
display_name = null;
lore = null;
permission = null;
enabled = true;
texture_path = null;
material = null;
pattern = null;
ingredients = null;
durability = null;
amount = 1;
attributes = null;
attributes_count = $('#attributes_count').val();
onAttributeChanged(attributes_count);
enchantements = 0;
enchantements_count = $('#enchantements_count').val();
onEnchantementsChanged(enchantements_count);

add_effects_count = 0;

add_effects = null;
remove_effects_count = 0;
remove_effects = null;
particle = null;
class enchantement {
    constructor(type, level) {
        this.type = type;
        this.level = level;
    }
}
class effect {
    constructor(amplifier, duration, effect) {
        this.amplifier = amplifier;
        this.duration = duration;
        this.effect = effect;
    }
}
class attribute {
    constructor(name, amount, equipement_slot) {
        this.name = name;
        this.amount = amount;
        this.equipement_slot = equipement_slot;
    }
}
class play_particle {
    constructor(name, count, time) {
        this.name = name;
        this.count = count;
        this.time = time;
    }
}
class play_sound {
    constructor(name) {
        this.name = name;
        this.volume = 1;
        this.pitch = 1;
    }
}

class interact {
    constructor() {

    }
}


$("#create").click(function () {
    material = $('#material').val()
    item_unique_id = $('#item_unique_id').val()
    display_name = $('#display_name').val()
    lore = ''
    if (($('#lore1').val() + $('#lore2').val() + $('#lore3').val() + $('#lore4').val()).length > 0)
        lore = '  lore:\n';

    if ($('#lore1').val().length > 0)
        lore += '  - \'' + $('#lore1').val() + '\'\n';
    if ($('#lore2').val().length > 0)
        lore += '  - \'' + $('#lore2').val() + '\'\n';
    if ($('#lore3').val().length > 0)
        lore += '  - \'' + $('#lore3').val() + '\'\n';
    if ($('#lore4').val().length > 0)
        lore += '  - \'' + $('#lore4').val() + '\'\n';

    texture_path = $('#texture_path').val()
    model_path = $('#model_path').val()
    if ($('#pattern').val() != null)
        pattern = $('#pattern').val().split(';')
    if ($('#ingredients').val() != null)
        ingredients = $('#ingredients').val().split(';')
    durability = $('#durability').val()

    attributes = [];
    
    for (var i = 0; i < attributes_count; ++i) {
        attributes.push(new attribute(
            $('#attribute_name_' + i).val(),
            $('#attribute_amount_' + i).val(),
            $('#equipment_slot_' + i).val(),
        ));
    }
    enchantements = []
    for (var i = 0; i < enchantements_count; ++i) {
        enchantements.push(new enchantement(
            $('#enchantement_type_' + i).val(),
            $('#enchantement_level_' + i).val()
        ));
    }



    recipe='';
    if (pattern[0].length > 0 && pattern[1].length > 0 && pattern[2] > 0) {
        recipe = item_unique_id + ':\n'
        recipe += '  permission: itemsadder.' + item_unique_id + '\n';
        recipe += '  enabled:true\n';
        recipe += '  pattern:\n';
        recipe += '  - ' + pattern[0] + '\n';
        recipe += '  - ' + pattern[1] + '\n';
        recipe += '  - ' + pattern[2] + '\n';
        recipe += '  ingredients:\n';
        for (var i = 0; i < ingredients.length; ++i)
            recipe += '    ' + ingredients[i] + '\n';
        recipe += '  result:\n';
        recipe += '    item: itemsadder.' + item_unique_id + '\n';
        recipe += '    amount:' + amount + '\n';
    }
    console.log(recipe);

    item = item_unique_id + ':\n';
    item += '  display_name: ' + display_name + '\n';
    item += lore;
    item += '  permission: ' + item_unique_id + '\n';
    item += '  resource:\n';
    item += '    material: ' + material + '\n';
    item += '    generate: true\n';
    if (texture_path.length > 0)
        item += '    textures:\n    - ' + texture_path + '\n';
    if (model_path.length > 0)
        item += '    model_path: ' + model_path + '\n';
    if (durability > 0) {
        item += '  durability:\n';
        item += '    max_custom_durability: ' + durability + '\n';
    }
    if (attributes.length > 0) {
        item += '  attribute_modifiers:\n';
        for (var i = 0; i < attributes.length; ++i) {
            item += '    ' + attributes[i].equipement_slot + ':\n';
            item += '      ' + attributes[i].name + ': ' + attributes[i].amount + '\n';
        }
    }
    if (enchantements.length > 0) {
        item += '  enchants:\n'
        for (var i = 0; i < enchantements.length; ++i) {
            item += '  - ' + enchantements[i].type + ':' + enchantements[i].level + '\n';
        }
    }

    events = ['eat', 'drink', 'right', 'left', 'attack'];


    for (var i = 0; i < events.length; ++i) {
        mEvent = events[i];
        particle = new play_particle(
            $('#' + mEvent + '_particle_name').val(),
            $('#' + mEvent + '_particle_count').val(),
            $('#' + mEvent + '_particle_duration').val()
        );
        sound_effect = $('#' + mEvent + '_play_sound_name').val();
        if ($('#' + mEvent + '_execute_commands').val() != undefined)
            commands = $('#' + mEvent + '_execute_commands').val().split(';');
        as_cosole = $('#' + mEvent + '_execute_commands_as_console').val();
        if (as_cosole == undefined)
            as_cosole = false;
        remove_effects = []
        if (remove_effects_count > 0)
            for (var j = 0; j < remove_effects_count; ++j) {
                remove_effects.push(
                    $('#' + mEvent + '_remove_effect_' + i).val()
                );
            }
        add_effects = []
        if (add_effects_count > 0)
            for (var j = 0; j < add_effects_count; ++j) {
                add_effects.push(
                    new effect(
                        $('#' + mEvent + '_amplifier_effect_' + i).val(),
                        $('#' + mEvent + '_duration_effect_' + i).val(),
                        $('#' + mEvent + '_add_effect_' + i).val()
                    )
                );
            }
        if ((particle.name != undefined && particle.name.length > 0)
            || (sound_effect != undefined && sound_effect.length > 0)
            || commands[0].length > 0
            || add_effects > 0) {
            item += '  events:\n';
            white_spaces = '';
            if (mEvent == 'eat' || mEvent == 'drink' || mEvent == 'attack')
                item += '    ' + mEvent + ':\n';
            else if (mEvent == 'right' || mEvent == 'left') {
                item += '    interact:\n';
                item += '      ' + mEvent + ':\n';

                white_spaces = '  ';
            }
            if (particle.name.length > 0) {
                item += white_spaces + '      play_effect:\n';
                item += white_spaces + '        name: ' + particle.name + '\n';
            }
            if (sound_effect.length > 0) {
                item += white_spaces + '      play_sound:\n';
                item += white_spaces + '        name: ' + sound_effect + '\n';
                item += white_spaces + '        volume: 1\n';
                item += white_spaces + '        pitch: 1\n';
            }
            if (commands[0].length > 0) {
                item += white_spaces + '      execute_commands:\n';
                for (var j = 0; j < commands.length; ++j) {
                    item += white_spaces + '        ' + j + ':\n';
                    item += white_spaces + '          command: ' + commands[j] + '\n';
                    item += white_spaces + '          as_console: ' + as_cosole + '\n';
                }
            }
            if (add_effects.length > 0) {
                for (var j = 0; j < commands.length; ++j) {
                    item += white_spaces + '      potion_effect_' + j + ':\n';
                    item += white_spaces + '        type: ' + add_effects[j].effect + '\n';
                    item += white_spaces + '        amplifier: ' + add_effects[j].amplifier + '\n';
                    item += white_spaces + '        duration: ' + add_effects[j].duration + '\n';
                }
            }
        }
    }











    $('.imgCommand').html(recipe + '\n' + item);
    data = new Blob([recipe + '\n' + item], { type: "text/plain;charset=utf-8" });
    download_link = document.getElementById('download_link');
    console.log(item_unique_id + '.yml');
    download_link.download = (item_unique_id + '.yml');
    download_link.href = window.URL.createObjectURL(data);
    download_link.click()
    console.log(item);

});


drop='mobs';
function onDropRadioChanged(value){

}
function CreateDrop(){
    loots='loots:\n';
    loots+='  '+drop+'\n'
}

function returnEnchantements(amount) {
    mForm = '<form onSubmit=\"return false;\" "\><br\><input type=\"text\" id=\"enchantement_level_' + amount + '\" name=\"lname\" placeholder=\"Уровень чар\"\><br\><select name=\"pets\" id=\"enchantement_type_' + amount + '\"\>';
    mForm += '<option value="protection"\>PROTECTION_ENVIRONMENTAL</option\><option value="fire_protection"\>PROTECTION_FIRE</option\><option value="feather_falling"\>PROTECTION_FALL</option\><option value="blast_protection"\>PROTECTION_EXPLOSIONS</option\><option value="projectile_protection"\>PROTECTION_PROJECTILE</option\><option value="respiration"\>OXYGEN</option\><option value="aqua_affinity"\>WATER_WORKER</option\><option value="thorns"\>THORNS</option\><option value="depth_strider"\>DEPTH_STRIDER</option\><option value="frost_walker"\>FROST_WALKER</option\><option value="sharpness"\>DAMAGE_ALL</option\><option value="smite"\>DAMAGE_UNDEAD</option\><option value="bane_of_arthropods"\>DAMAGE_ARTHROPODS</option\><option value="knockback"\>KNOCKBACK</option\><option value="fire_aspect"\>FIRE_ASPECT</option\><option value="looting"\>LOOT_BONUS_MOBS</option\><option value="efficiency"\>DIG_SPEED</option\><option value="silk_touch"\>SILK_TOUCH</option\><option value="unbreaking"\>DURABILITY</option\><option value="fortune"\>LOOT_BONUS_BLOCKS</option\><option value="power"\>ARROW_DAMAGE</option\><option value="punch"\>ARROW_KNOCKBACK</option\><option value="flame"\>ARROW_FIRE</option\><option value="infinity"\>ARROW_INFINITE</option\><option value="luck_of_the_sea"\>LUCK</option\><option value="lure"\>LURE</option\><option value="mending"\>MENDING</option\></select\></form\>';
    return mForm;
}


function returnAttribute(number) {
    mForm = '<form onSubmit=\"return false;\" style=\"margin-top:5px;padding:5px;background-color: #303030;margin: auto; border-radius: 5px;margin:5px\"\><input type=\"text\" id=\"' + 'attribute_amount_' + number + '\" name=\"lname\" placeholder=\"На сколько увеличить\"\><br><br>';
    //mForm += '<select name=\"pets\" id=\"attribute_name_' + number + '\"\><option value=\"GENERIC_ARMOR\"\>Броня</option\><option value=\"GENERIC_ARMOR_TOUGHNESS\"\>Прочность брони</option\><option value=\"GENERIC_ATTACK_DAMAGE\"\>Урон</option\><option value=\"GENERIC_ATTACK_KNOCKBACK\"\>Откидывание</option\><option value=\"GENERIC_ATTACK_SPEED\"\>Скорость атаки</option\><option value=\"GENERIC_KNOCKBACK_RESISTANCE\"\>Сопротивление откидыванию</option\><option value=\"GENERIC_LUCK\"\>Удача</option\><option value=\"GENERIC_MAX_HEALTH\"\>Макс. здоровье</option\><option value=\"GENERIC_MOVEMENT_SPEED\"\>Скорость передвижения</option\></select\><br\><br\><select name=\"pets\" id=\"equipment_slot_' + number + '\"\><option value=\"mainhand\"\>В главной руке</option\><option value=\"offhand\"\>В побочной руке</option\><option value=\"head\"\>Голова</option\><option value=\"chest\"\>Нагрудник</option\><option value=\"legs\"\>Поножи</option\><option value=\"feet\"\>Ботинки</option\></select\></form\>';
    mForm += '<select name=\"pets\" id=\"attribute_name_' + number + '\"\><option value=\"ARMOR\"\>Броня</option\><option value=\"ARMOR_TOUGHNESS\"\>Прочность брони</option\><option value=\"ATTACK_DAMAGE\"\>Урон</option\><option value=\"ATTACK_KNOCKBACK\"\>Откидывание</option\><option value=\"ATTACK_SPEED\"\>Скорость атаки</option\><option value=\"KNOCKBACK_RESISTANCE\"\>Сопротивление откидыванию</option\><option value=\"LUCK\"\>Удача</option\><option value=\"MAX_HEALTH\"\>Макс. здоровье</option\><option value=\"MOVEMENT_SPEED\"\>Скорость передвижения</option\></select\><br\><br\><select name=\"pets\" id=\"equipment_slot_' + number + '\"\><option value=\"mainhand\"\>В главной руке</option\><option value=\"offhand\"\>В побочной руке</option\><option value=\"head\"\>Голова</option\><option value=\"chest\"\>Нагрудник</option\><option value=\"legs\"\>Поножи</option\><option value=\"feet\"\>Ботинки</option\></select\></form\>';
    return mForm;
}

function returnRemoveEffects(number, event) {
    console.log(event)
    mForm = '<form\><select name=\"pets\" id=\"' + event + '_remove_effect_' + number + '\"\><option value=\"ABSORPTION\"\>ABSORPTION</option\><option value=\"BAD_OMEN\"\>BAD_OMEN</option\><option value=\"BLINDNESS\"\>BLINDNESS</option\><option value=\"CONDUIT_POWER\"\>CONDUIT_POWER</option\><option value=\"CONFUSION\"\>CONFUSION</option\><option value=\"DAMAGE_RESISTANCE\"\>DAMAGE_RESISTANCE</option\><option value=\"DOLPHINS_GRACE\"\>DOLPHINS_GRACE</option\><option value=\"FAST_DIGGING\"\>FAST_DIGGING</option\><option value=\"FIRE_RESISTANCE\"\>FIRE_RESISTANCE</option\><option value=\"GLOWING\"\>GLOWING</option\><option value=\"HARM\"\>HARM</option\><option value=\"HEAL\"\>HEAL</option\><option value=\"HEALTH_BOOST\"\>HEALTH_BOOST</option\><option value=\"HERO_OF_THE_VILLAGE\"\>HERO_OF_THE_VILLAGE</option\><option value=\"HUNGER\"\>HUNGER</option\><option value=\"INCREASE_DAMAGE\"\>INCREASE_DAMAGE</option\><option value=\"INVISIBILITY\"\>INVISIBILITY</option\><option value=\"JUMP\"\>JUMP</option\><option value=\"LEVITATION\"\>LEVITATION</option\><option value=\"LUCK\"\>LUCK</option\><option value=\"NIGHT_VISION\"\>NIGHT_VISION</option\><option value=\"POISON\"\>POISON</option\><option value=\"REGENERATION\"\>REGENERATION</option\><option value=\"SATURATION\"\>SATURATION</option\><option value=\"SLOW\"\>SLOW</option\><option value=\"SLOW_DIGGING\"\>SLOW_DIGGING</option\><option value=\"SLOW_FALLING\"\>SLOW_FALLING</option\><option value=\"SPEED\"\>SPEED</option\><option value=\"UNLUCK\"\>UNLUCK</option\><option value=\"WATER_BREATHING\"\>WATER_BREATHING</option\><option value=\"WEAKNESS\"\>WEAKNESS</option\><option value=\"WITHER\"\>WITHER</option\></select\></form\><br\>';
    return mForm;
}

function onRemoveEffectChanged(value, event) {
    if (parseInt(value) != NaN) {
        newVal = parseInt(value);
        if (newVal > 0) {
            remove_effects_count = newVal;
            $('#' + event + '_form_remove_effects').empty();
            for (var i = 0; i < remove_effects_count; ++i) {
                $('#' + event + '_form_remove_effects').append(returnRemoveEffects(i, event));

            }
        }
    }
}

function returnAddEffects(number, event) {
    console.log(number, event);
    mForm = '<form onSubmit=\"return false;\" \><input type=\"text\" id=\"' + event + '_amplifier_effect_' + number + '\" name=\"lname\" placeholder=\"Сила эффекта\"\><br\><input type=\"text\" id=\"' + event + '_duration_effect_' + number + '\" name=\"lname\" placeholder=\"Длительность эффекта\"\><br\><select name=\"pets\" id=\"' + event + '_add_effect_' + number + '\"\><option value=\"ABSORPTION\"\>ABSORPTION</option\><option value=\"BAD_OMEN\"\>BAD_OMEN</option\><option value=\"BLINDNESS\"\>BLINDNESS</option\><option value=\"CONDUIT_POWER\"\>CONDUIT_POWER</option\><option value=\"CONFUSION\"\>CONFUSION</option\><option value=\"DAMAGE_RESISTANCE\"\>DAMAGE_RESISTANCE</option\><option value=\"DOLPHINS_GRACE\"\>DOLPHINS_GRACE</option\><option value=\"FAST_DIGGING\"\>FAST_DIGGING</option\><option value=\"FIRE_RESISTANCE\"\>FIRE_RESISTANCE</option\><option value=\"GLOWING\"\>GLOWING</option\><option value=\"HARM\"\>HARM</option\><option value=\"HEAL\"\>HEAL</option\><option value=\"HEALTH_BOOST\"\>HEALTH_BOOST</option\><option value=\"HERO_OF_THE_VILLAGE\"\>HERO_OF_THE_VILLAGE</option\><option value=\"HUNGER\"\>HUNGER</option\><option value=\"INCREASE_DAMAGE\"\>INCREASE_DAMAGE</option\><option value=\"INVISIBILITY\"\>INVISIBILITY</option\><option value=\"JUMP\"\>JUMP</option\><option value=\"LEVITATION\"\>LEVITATION</option\><option value=\"LUCK\"\>LUCK</option\><option value=\"NIGHT_VISION\"\>NIGHT_VISION</option\><option value=\"POISON\"\>POISON</option\><option value=\"REGENERATION\"\>REGENERATION</option\><option value=\"SATURATION\"\>SATURATION</option\><option value=\"SLOW\"\>SLOW</option\><option value=\"SLOW_DIGGING\"\>SLOW_DIGGING</option\><option value=\"SLOW_FALLING\"\>SLOW_FALLING</option\><option value=\"SPEED\"\>SPEED</option\><option value=\"UNLUCK\"\>UNLUCK</option\><option value=\"WATER_BREATHING\"\>WATER_BREATHING</option\><option value=\"WEAKNESS\"\>WEAKNESS</option\><option value=\"WITHER\"\>WITHER</option\></select\></form\><br\>'
    return mForm;
}

function onAddEffectChanged(value, event) {
    if (parseInt(value) != NaN) {
        newVal = parseInt(value);
        if (newVal > 0) {
            add_effects_count = newVal;
            $('#' + event + '_form_add_effects').empty();
            for (var i = 0; i < add_effects_count; ++i) {
                $('#' + event + '_form_add_effects').append(returnAddEffects(i, event));

            }
        }
    }
}

function onAttributeChanged(value) {
    if (parseInt(value) != NaN) {
        newVal = parseInt(value);
        if (newVal > 0) {
            attributes_count = newVal;
            $('#form_attributes').empty();
            for (var i = 0; i < attributes_count; ++i) {
                $('#form_attributes').append(returnAttribute(i));
            }
        }
    }
}

function onEnchantementsChanged(value) {
    if (parseInt(value) != NaN) {
        newVal = parseInt(value);
        if (newVal > 0) {
            enchantements_count = newVal;
            $('#form_enchantements').empty();
            for (var i = 0; i < enchantements_count; ++i) {
                $('#form_enchantements').append(returnEnchantements(i));
            }
        }
    }
}
