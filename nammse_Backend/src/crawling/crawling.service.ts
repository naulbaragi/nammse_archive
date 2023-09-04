import axios from 'axios';
import puppeteer from 'puppeteer';
import { promises as fsPromises } from 'fs';
import * as fs from 'fs';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { NammseRepository } from 'src/nammse/nammse.repository';
import { FactcheckRepository } from 'src/main/main.repository';
import { NammseDto } from 'src/nammse/dto/nammse.dto';
import { FactcheckDto } from 'src/main/dto/main.dto';
import { InstagramID, InstagramPW, StorageSRC } from 'src/SecretKEY_backend';

@Injectable()
export class CrawlingService {
  private readonly logger = new Logger(CrawlingService.name);
  constructor(
    @InjectRepository(NammseRepository)
    private nammseRepository: NammseRepository,
    @InjectRepository(FactcheckRepository)
    private factcheckRepository: FactcheckRepository,
  ) {}

  async updatemaindata(): Promise<void> {
    console.log('updatemaindata');
  }

  // @Cron('0 5 18 * * 5')
  @Cron('0 12 * * * *')
  nammse_YoutubeUpdate() {
    this.logger.debug('nammse Update Start!!');
    (async function () {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.setViewport({ width: 1080, height: 1024 });
      await page.goto('https://www.youtube.com/@NAMMSE/videos');
      await page.waitForTimeout(2000);
      const nammse_Elements = await page.$$('a#video-title-link');
      const nammse_linkLists = [];
      for (let i = 0; i < nammse_Elements.length; i++) {
        const nammse_titleText = await nammse_Elements[i].evaluate(
          (element) => element.textContent,
        );
        const wordCheck = nammse_titleText.substr(0, 8);
        const episodeCheck = nammse_titleText.match(/(\d+)/);
        //DB존재여부 확인
        const nammse_latestrelease = await this.nammseRepository.nammseFindOne(
          episodeCheck?.[0],
        );
        console.log(nammse_latestrelease);
        if (wordCheck === '[NAMMSE]' && !nammse_latestrelease) {
          const link = await nammse_Elements[i].evaluate((element) =>
            element.getAttribute('href'),
          );
          nammse_linkLists.push(link);
        } else {
          this.logger.debug('already exists');
        }
      }
      for (let i = 0; i < nammse_linkLists.length; i++) {
        await page.goto('https://www.youtube.com' + nammse_linkLists[i]);
        const moreButton = await page.waitForSelector(
          '.more-button.style-scope.ytd-comment-renderer',
        );
        await moreButton.click();
        const nammsePlaylist_beforeParse = await page.$eval(
          '#content-text',
          (element) => element.textContent,
        );

        const nammsePlaylist_split = nammsePlaylist_beforeParse.split('\n');
        const nammsePlaylist_basicParse = nammsePlaylist_split.filter(
          (element) => element.includes('Playlist_') || element.includes(':'),
        );
        const numberParse = nammsePlaylist_basicParse[0].match(/(\d+)/);
        const episode = numberParse ? numberParse[0] : null;
        const nammselink: string = nammse_linkLists[i];
        const time_singer_song = nammsePlaylist_basicParse.slice(1);
        for (let j = 0; j < time_singer_song.length; j++) {
          const tracknumber = j;
          const timeStamp = [...time_singer_song[j]].splice(0, 6);
          const timeStamp_minute =
            parseInt(timeStamp.slice(0, 2).join('')) * 60;
          const timeStamp_second = parseInt(timeStamp.slice(3, 6).join(''));
          const timeStamp_minuteSecond = timeStamp_minute + timeStamp_second;
          const songlink = nammselink + `&t=${timeStamp_minuteSecond}s`;
          const singer_song = time_singer_song[j].slice(6).split(' - ');
          const singer = singer_song[0];
          const song = singer_song[1];
          const nammsePlaylist_Parsedata = {
            Episode: parseInt(episode),
            Track: tracknumber,
            Link: 'https://www.youtube.com' + nammselink,
            Songlink: 'https://www.youtube.com' + songlink,
            Singer: singer,
            Song: song,
          };
          const nammseparseDto = plainToClass(
            NammseDto,
            nammsePlaylist_Parsedata,
          );
          console.log(nammseparseDto);

          //DB추가
          await this.nammseRepository.nammseUpdate(nammseparseDto);
        }
      }
      await browser.close();
      this.logger.debug('nammse Update End!!');
    }).bind(this)();
  }

  // @Cron('0 5 19 * * 5')
  @Cron('0 12 * * * *')
  nammse_InstagramUpdate() {
    this.logger.debug('nammse Art Update Start!!');
    (async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.setViewport({ width: 1980, height: 1080 });
      await page.goto('https://www.instagram.com/');
      await page.waitForTimeout(2000);
      const IDinput = await page.waitForSelector('input[name="username"]');
      const PWinput = await page.waitForSelector('input[name="password"]');

      await IDinput.type(InstagramID);
      await PWinput.type(InstagramPW);
      await Promise.all([PWinput.press('Enter'), page.waitForNavigation()]);

      await page.goto('https://www.instagram.com/rrace/');
      await page.waitForTimeout(2000);

      //스크롤
      await page.evaluate(() => {
        window.scrollBy(0, 400); //
      });
      await page.waitForTimeout(2000);

      const instagram_divdata = await page.$$('div._aagu');
      const instagram_linkarray = [];

      for (let i = 0; i < 9; i++) {
        const instagram_divparent = await instagram_divdata[i].evaluateHandle(
          (element) => element.parentNode,
        );
        const instagram_divhref = await instagram_divparent.getProperty('href');
        const instagram_divhrefjson = await instagram_divhref.jsonValue();
        instagram_linkarray.push(instagram_divhrefjson);
      }

      for (let i = 0; i < 9; i++) {
        await page.goto(instagram_linkarray[i]);
        // await page.waitForTimeout(2000);

        const [instagram_nammse] = await page.$x(
          '/html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div[1]/div[2]/section/main/div/div[1]/div/div[2]/div/div[2]/div/div/div[1]/div/div[2]/div/span/div/span',
        );

        const instagram_text = await page.evaluate(
          (element: HTMLHeadingElement) => {
            if (element) {
              return element.innerText;
            } else {
              return null;
            }
          },
          instagram_nammse,
        );

        console.log(instagram_text);

        const instagram_textparse = instagram_text?.split('\n');
        if (instagram_textparse?.[0] === '[NAMMSE]') {
          const parseEpisode = instagram_textparse[3].split('_');
          const imgfilename = parseInt(parseEpisode[1]);
          console.log('episode', imgfilename);
          const parseImage = await page.$('div._aagv > img');
          const parseImagesrc = await parseImage.getProperty('src');
          const parseImagesrc_link = await parseImagesrc.jsonValue();
          (async function () {
            if (
              !fs.existsSync(StorageSRC + '/' + String(imgfilename) + '.png')
            ) {
              try {
                const response = await axios.get(parseImagesrc_link, {
                  responseType: 'arraybuffer',
                });
                const imageData = response.data;
                fsPromises.writeFile(
                  StorageSRC + '/' + String(imgfilename) + '.png',
                  imageData,
                );
                console.log('이미지 파일 저장 성공');
              } catch (error) {
                console.log('Error downloading or saving image:', error);
                throw error;
              }
            } else {
              console.log('파일이 이미 존재합니다.');
            }
          })();
        }
      }
      await browser.close();
      this.logger.debug('nammse Art Update end!!');
    })();
  }

  // @Cron('0 0 8 * * *')
  // @Cron('0 12 * * * *')
  FactcheckUpdate() {
    this.logger.debug('Factcheck Update Start!!');
    (async function () {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.setViewport({ width: 1080, height: 1024 });
      await page.goto('https://factcheck.snu.ac.kr/');
      const popup_Element = await page.$(
        'div > div.modal.show > div > div > div.modal-footer > button.btn.btn-outline-secondary',
      );
      await popup_Element.click();
      await page.waitForTimeout(2000);
      const factTitles = [];
      // const factcheck_link = [];
      const factNames = [];
      const factSources = [];
      const factSource_link = [];
      const factFacts = [];
      for (let i = 1; i < 11; i++) {
        const Title = await page.waitForXPath(
          `//*[@id="__next"]/div/div[2]/div[2]/div[1]/div[2]/div[${i}]/div/div[2]/div[1]/div[1]/div[1]`,
        );
        const Title_text = await Title.evaluate(
          (element) => element.textContent,
        );
        factTitles.push(Title_text);
      }
      for (let i = 1; i < 11; i++) {
        const Name = await page.waitForXPath(
          `//*[@id="__next"]/div/div[2]/div[2]/div[1]/div[2]/div[${i}]/div/div[1]/div[2]/div[1]`,
        );
        const Name_text = await Name.evaluate((element) => element.textContent);
        factNames.push(Name_text);
      }

      for (let i = 1; i < 11; i++) {
        const Source = await page.waitForXPath(
          `//*[@id="__next"]/div/div[2]/div[2]/div[1]/div[2]/div[${i}]/div/div[2]/div[1]/div[1]/div[2]`,
        );
        const Source_text = await Source.evaluate(
          (element) => element.textContent,
        );
        factSources.push(Source_text);
      }

      for (let i = 1; i < 11; i++) {
        const XPathoptions = {
          visible: true,
          timeout: 2000,
        };
        try {
          const Source = await page.waitForXPath(
            `//*[@id="__next"]/div/div[2]/div[2]/div[1]/div[2]/div[${i}]/div/div[2]/div[1]/div[1]/div[2]/a`,
            XPathoptions,
          );
          const Source_jsonlink = await Source.getProperty('href');
          const Source_link = await Source_jsonlink.jsonValue();
          factSource_link.push(Source_link);
        } catch (err) {
          console.log('Link Not Exist');
          factSource_link.push('');
        }
      }

      for (let i = 1; i < 11; i++) {
        const Factcheck_torf = await page.waitForXPath(
          `//*[@id="__next"]/div/div[2]/div[2]/div[1]/div[2]/div[${i}]/div/div[2]/div[1]/div[2]/div[4]`,
        );
        const Factcheck_text = await Factcheck_torf.evaluate(
          (element) => element.textContent,
        );
        factFacts.push(Factcheck_text);
      }

      for (let i = 9; i >= 0; i--) {
        const factcheck_Parsedata = {
          Title: factTitles[i],
          Name: factNames[i],
          Source_link: factSource_link[i],
          Source: factSources[i],
          Factcheckfact: factFacts[i],
        };

        const factcheckparseDto = plainToClass(
          FactcheckDto,
          factcheck_Parsedata,
        );
        //DB추가
        await this.factcheckRepository.factcheckUpdate(factcheckparseDto);
        console.log('업데이트 완료');
      }
      await page.waitForTimeout(2000);
      await browser.close();
      this.logger.debug('Factcheck Update End!!');
    }).bind(this)();
  }
}
