import { MitsuhaClient, Message } from '#lib/MitsuhaClient';
import { MessageEmbed } from 'discord.js';
import { embedItem as item } from '#utils/MitsuhaEmbed';
import { Command } from '#builders/Command';
import { codeBlock } from '@sapphire/utilities';
import i18n from 'i18n-iso-countries';
import fetch from 'node-fetch';

const key = process.env.OPEN_WEATHER_MAP_KEY;

export const command: Command = new Command(
  'weather',
  {
    usage: '[city]',
    category: 'information',
  },
  async (client: MitsuhaClient, message: Message, args: string[]) => {
    if (!args[0])
      return message.channel.send("You need to write a city's name!");
    const city = encodeURI(args[0]);
    const url =
      'http://api.openweathermap.org/data/2.5/weather?q=' +
      city +
      '&units=metric&appid=' +
      key;

    let res: any;

    try {
      res = await fetch(url);
    } catch (err) {
      return message.channel.send(
        'An error occured while trying to execute this command!\n' +
          codeBlock('ts', err)
      );
    }

    const info = await res.json();

    if (info.cod == 404)
      return message.channel.send('City `' + city + '` not found.');

    const weather = info.weather[0];
    const country = {
      code: info.sys.country,
      name: i18n.getName(info.sys.country, 'en', { select: 'official' }),
    };
    const icon = 'http://openweathermap.org/img/w/' + weather.icon + '.png';
    const em: MessageEmbed = new MessageEmbed()
      .setColor(client.constants.COLORS.normal)
      .setDescription(
        '**' +
          info.name +
          ', ' +
          (country.name || '') +
          '**\n> ' +
          info.weather[0].description +
          '\n' +
          item('Main', info.weather[0].main) +
          item('Temperature', info.main.temp + '°C') +
          item('Min temperature', info.main.temp_min + '°C') +
          item('Max temperature', info.main.temp_max + '°C') +
          item('Feels like', info.main.feels_like + '°C') +
          item('Humidity', info.main.humidity + '%') +
          item('Air pressure', info.main.pressure + ' hPa') +
          item('Wind speed', info.wind.speed + ' Meters/s')
      )
      .setThumbnail(icon)
      .setFooter('Powered by Open Weather Map');

    return message.channel.send(em);
  }
);
