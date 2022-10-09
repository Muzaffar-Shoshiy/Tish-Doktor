const { Telegraf, Stage, session } = require("telegraf");
const WizardScene = require("telegraf/scenes/wizard");
const mysql = require('mysql');

require("dotenv").config()
const token = process.env.api
const bot = new Telegraf(token)

const con = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

const full_name = new WizardScene(
  'full_name',
  async (ctx) => {
    try {
      await ctx.replyWithChatAction('typing')
      await bot.telegram.sendVideo(ctx.chat.id, "BAACAgIAAxkBAAM3Y0KaAdXtnadvAeqKGfzt1wH1NQwAAnsXAAKuTflJTa5lW2m-QO4qBA", { caption: "🎞 Ushbu video sizga ro'yxatdan o'tishingizga yordam beradi!" })
      await ctx.replyWithHTML(`F.I.Sh ni kirting: \nMasalan: Muzaffar Tursunov Jaloliddin o'g'li `)
      return ctx.wizard.next()
    } catch{}
  },
  async (ctx) => {
    try {
      // console.log(ctx.message.text)
      const full_name = ctx.message.text
      con.connect(function (err) {
        const sql = `UPDATE dentists SET full_name = "${full_name}" WHERE chat_id = '${ctx.chat.id}'`;
        con.query(sql)
      })
      await ctx.replyWithChatAction('typing')
      await ctx.replyWithHTML(`Sizning to'liq ismingiz: <b>${full_name}</b>!`)
      await bot.telegram.sendMessage(ctx.chat.id, `Siz qaysi shaharda faoliyat olib borasiz?`, {
        reply_markup: {
          keyboard: [
            [{text: "📍Toshkent sh"}],
            [{text: "📍Toshkent vil"}],
            [{text: "📍Andijon vil"}],
            [{text: "📍Namangan vil"}],
            [{text: "📍Farg'ona vil"}],
            [{text: "📍Sirdaryo vil"}],
            [{text: "📍Jizzax vil"}],
            [{text: "📍Samarqand vil"}],
            [{text: "📍Navoiy vil"}],
            [{text: "📍Qashqadaryo vil"}],
            [{text: "📍Surxondaryo vil"}],
            [{text: "📍Buxoro vil"}],
            [{text: "📍Xorazm vil"}],
          ],
          resize_keyboard: true,
          one_time_keyboard:true
        }
      })
      return ctx.scene.leave()
    } catch{}
  }
)
const full_nameru = new WizardScene(
  'full_nameru',
  async (ctx) => {
    try {
      await ctx.replyWithChatAction('typing')
      await bot.telegram.sendVideo(ctx.chat.id, "BAACAgIAAxkBAAM4Y0KaJJatw8rNrXbF2msgz_grHl4AApsXAAKuTflJzldCvegfY7AqBA", { caption: "🎞 Это видео поможет вам зарегистрироваться!" })
      await ctx.replyWithHTML(`Введите Ф.И.O.: \nНапример: Музаффар Турсунов Джалолиддинович`)
      return ctx.wizard.next()
    } catch{}
  },
  async (ctx) => {
    try {
      // console.log(ctx.message.text)
      const full_name = ctx.message.text
      con.connect(function (err) {
        const sql = `UPDATE dentists SET full_name = "${full_name}" WHERE chat_id = '${ctx.chat.id}'`;
        con.query(sql)
      })
      await ctx.replyWithChatAction('typing')
      await ctx.replyWithHTML(`Sizning to'liq ismingiz: <b>${full_name}</b>!`)
      await bot.telegram.sendMessage(ctx.chat.id, `В каком городе вы работаете?`, {
        reply_markup: {
          keyboard: [
            [{text: "📍Ташкент"}],
            [{text: "📍Ташкентская область"}],
            [{text: "📍Андижанская область"}],
            [{text: "📍Наманганская область"}],
            [{text: "📍Ферганская область"}],
            [{text: "📍Сырдарьинская область"}],
            [{text: "📍Джизакская область"}],
            [{text: "📍Самаркандская область"}],
            [{text: "📍Навоийская область"}],
            [{text: "📍Кашкадарьинская область"}],
            [{text: "📍Сурхандарьинская область"}],
            [{text: "📍Бухарская область"}],
            [{text: "📍Хорезмская область"}],
            [{text: "◀️ Назад"}]
          ],
          resize_keyboard: true,
          one_time_keyboard:true
        }
      })
      return ctx.scene.leave()
    } catch{}
  } 
)

const experience = new WizardScene(
  'experience',
  async (ctx) => {
    try {
      await ctx.replyWithChatAction('typing')
      await ctx.replyWithHTML(`Necha yillik tajribangiz bor?\nMasalan: 3 yillik bo'lsa, 3 yozib qoldiring!`)
      return ctx.wizard.next()
    } catch{}
  },
  async (ctx) => {
    try {
      // console.log(ctx.message.text)
      const experience = ctx.message.text
      con.connect(function (err) {
        const sql = `UPDATE dentists SET experience = '${experience}' WHERE chat_id = '${ctx.chat.id}'`;
        con.query(sql)
      })
      await ctx.replyWithChatAction('typing')
      await ctx.replyWithHTML(`Sizda <b>${experience}</b> yillik tajriba mavjud!`)
      await bot.telegram.sendMessage(ctx.chat.id, `💵 Bir martalik qabulingiz narxi qancha?\n\n❗️ Masalan, 50 000 so'm bo'lsa, '50 000' ni yuboring!`)
      return ctx.wizard.next()
    } catch{}
  },
  async (ctx) => {
    try {
      // console.log(ctx.message.text)
      const narx = ctx.message.text
      con.connect(function (err) {
        const sql = `UPDATE dentists SET fee = '${narx}' WHERE chat_id = '${ctx.chat.id}'`;
        con.query(sql)
      })
      await ctx.replyWithChatAction('typing')
      await ctx.replyWithHTML(`Bir martalik qabulingiz narxi <b>${narx}</b> so'm!`)
      await bot.telegram.sendMessage(ctx.chat.id, `Klinika manzilini yuboring. Ish joyingizda bo'lmasangiz, hozirgi manzilingizni yuboring. Klinika manzilini keyinroq /setlocation orqali o'zgartirasiz.`, {
        reply_markup: {
          keyboard: [
            [{ text: "Manzil yuborish", request_location: true }]
          ],
          one_time_keyboard: true,
          resize_keyboard:true
        }
      })
      return ctx.wizard.next()
    } catch{}
  },
  async (ctx) => {
    try {
      if (ctx.update.message.location) {
        // console.log(ctx.update.message.location.latitude)
        // console.log(ctx.update.message.location.longitude) // shu yerdan locationni bazaga saqliman
        con.connect(function (err) {
          const sql = `UPDATE dentists SET latitude = '${ctx.update.message.location.latitude}', longitude = '${ctx.update.message.location.longitude}' WHERE chat_id = '${ctx.chat.id}'`;
          con.query(sql)
        })
        await ctx.replyWithChatAction('typing')
        await bot.telegram.sendMessage(ctx.chat.id, `Telefon raqamingizni yuboring.`, {
          reply_markup: {
            keyboard: [
              [{ text: "Kontakt yuborish", request_contact: true }]
            ],
            one_time_keyboard: true,
            resize_keyboard:true
          }
        })
        return ctx.wizard.next()
      } else {
        await ctx.replyWithHTML(`🙏 Iltimos, quyida keltirilgan tugma orqali manzilingizni yuboring.`)
      } 
    } catch{}
  },
  async (ctx) => {
    try {
      // console.log(ctx.update.message.contact.phone_number) // cantact ni shu yerdan bazaga qowaman
      con.connect(function (err) {
        const sql = `UPDATE dentists SET phone = '${ctx.update.message.contact.phone_number}' WHERE chat_id = '${ctx.chat.id}'`;
        con.query(sql)
      })
      await ctx.replyWithChatAction('typing')
      await bot.telegram.sendMessage(ctx.chat.id, `Profilingiz uchun rasm yuboring.`)
      return ctx.wizard.next()
    } catch{}
  },
  async (ctx) => {
    try {
      // console.log(ctx.update.message.photo[0].file_id) // shu yerdan profil uchun rasm id-lari bazaga saqlanadi
      con.connect(function (err) {
        const sql = `UPDATE dentists SET photo = '${ctx.update.message.photo[0].file_id}' WHERE chat_id = '${ctx.chat.id}'`;
        con.query(sql)
      })
      await ctx.replyWithChatAction('typing')
      await bot.telegram.sendMessage(ctx.chat.id, `📥 Stomotologligingizni tasdiqlovchi hujjatni pdf yoki doc ko'rinishida taqdim eting.\n📃 Jumladan, Diplom, Sertifikat, ...\n⚠️ Iltimos, agar sizda bir vaqtning o'zida diplom hamda sertifikat bo'lsa, ularni yagona faylda yuboring!`)
      return ctx.wizard.next()
    } catch{}
  },
  async (ctx) => {
    try {
      // console.log(ctx.update.message.document.file_id)
       if (ctx.update.message.document.file_id) {
        con.connect(function (err) {
        const sql = `UPDATE dentists SET diploma = '${ctx.update.message.document.file_id}' WHERE chat_id = '${ctx.chat.id}'`;
        con.query(sql)
        })
        await ctx.replyWithChatAction('typing')
        await ctx.replyWithHTML(`🎉 Tabriklayman, sizning <b>Profilingiz</b> muvaffaqiyatli yaratildi!\n\n❗️ Eslatib o'taman sizning profilingiz orqali mijozlar aloqaga chiqishadi!\n\n❗️ Unutmang, sizning har bir ishingiz maqtovga loyiq!`)
        await bot.telegram.sendMessage(ctx.chat.id, `📍 Profilni ko'rish uchun quyidagi tugmani bosing.`, {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Profilni ko'rish", callback_data: "Profilni ko'rish" }]
            ]
          }
        })
      } else {
        ctx.replyWithHTML(`🙏 Iltimos, fayl jo'nating!`)
      }
      return ctx.scene.leave()
    } catch{}
  }
)

const experienceru = new WizardScene(
    'experienceru',
    async (ctx) => {
      try {
        await ctx.replyWithChatAction('typing')
        await ctx.replyWithHTML(`Сколько лет опыта у вас есть?\nНапример: если ему 3 года, напишите 3`)
        return ctx.wizard.next()
      } catch{}
    },
    async (ctx) => {
      try {
        // console.log(ctx.message.text)
        const experience = ctx.message.text
        con.connect(function (err) {
          const sql = `UPDATE dentists SET experience = '${experience}' WHERE chat_id = '${ctx.chat.id}'`;
          con.query(sql)
        })
        await ctx.replyWithChatAction('typing')
        await ctx.replyWithHTML(`У вас <b>${experience}</b> год(а) опыта!`)
        await bot.telegram.sendMessage(ctx.chat.id, `💵 Сколько стоит ваша разовая процедура?\n\n❗️ Например, если это 50 000 сумов, отправьте '50 000'`)
        return ctx.wizard.next()
      } catch{}
    },
    async (ctx) => {
      try {
        // console.log(ctx.message.text)
        const narx = ctx.message.text
        con.connect(function (err) {
          const sql = `UPDATE dentists SET fee = '${narx}' WHERE chat_id = '${ctx.chat.id}'`;
          con.query(sql)
        })
        await ctx.replyWithChatAction('typing')
        await ctx.replyWithHTML(`💵 Ваша разовая процедура стоит <b>${narx}</b> сумов`)
        await bot.telegram.sendMessage(ctx.chat.id, `Поделитесь местоположением клиник, в которых вы работаете.\n⚠️Если вы не на работе, пожалуйста, пришлите свой текущий адрес. Вы можете изменить адрес клиники позже с помощью кнопки /setlocation`, {
          reply_markup: {
            keyboard: [
              [{ text: "Поделиться местоположением", request_location: true }]
            ],
            one_time_keyboard: true,
            resize_keyboard:true
          }
        })
        return ctx.wizard.next()
      } catch{} 
    },
    async (ctx) => {
      try {
        if (ctx.update.message.location) {
          // console.log(ctx.update.message.location.latitude)
          // console.log(ctx.update.message.location.longitude) // shu yerdan locationni bazaga saqliman
          con.connect(function (err) {
            const sql = `UPDATE dentists SET latitude = '${ctx.update.message.location.latitude}', longitude = '${ctx.update.message.location.longitude}' WHERE chat_id = '${ctx.chat.id}'`;
            con.query(sql)
          })
          await ctx.replyWithChatAction('typing')
          await bot.telegram.sendMessage(ctx.chat.id, `Отправьте свой номер телефона.`, {
            reply_markup: {
              keyboard: [
                [{ text: "Поделиться контактом", request_contact: true }]
              ],
              one_time_keyboard: true,
              resize_keyboard:true
            } 
          })
          return ctx.wizard.next()
        } else {
          await ctx.replyWithHTML(`🙏 Пожалуйста, отправьте свое местоположение с помощью кнопки, представленной ниже 👇`)
        }
      } catch{}
    },
    async (ctx) => {
      try {
        // console.log(ctx.update.message.contact.phone_number) // cantact ni shu yerdan bazaga qowaman
        con.connect(function (err) {
          const sql = `UPDATE dentists SET phone = '${ctx.update.message.contact.phone_number}' WHERE chat_id = '${ctx.chat.id}'`;
          con.query(sql)
        })
        await ctx.replyWithChatAction('typing')
        await bot.telegram.sendMessage(ctx.chat.id, `Отправьте изображение для своего профиля.`)
        return ctx.wizard.next()
      } catch{}
    },
    async (ctx) => {
      try {
        // console.log(ctx.update.message.photo[0].file_id) // shu yerdan profil uchun rasm id-lari bazaga saqlanadi
        con.connect(function (err) {
          const sql = `UPDATE dentists SET photo = '${ctx.update.message.photo[0].file_id}' WHERE chat_id = '${ctx.chat.id}'`;
          con.query(sql)
        })
        await ctx.replyWithChatAction('typing')
        await bot.telegram.sendMessage(ctx.chat.id, `📥 Отправьте документ, подтверждающий вашу стоматологию в формате pdf или doc.\n📃 В том числе диплом, сертификат, ...\n⚠️ Пожалуйста, если у вас есть диплом и сертификат одновременно, пришлите их одним файлом!`)
        return ctx.wizard.next()
      } catch{}
    },
    async (ctx) => {
      try {
        // console.log(ctx.update.message.document.file_id)
         if (ctx.update.message.document.file_id) {
          con.connect(function (err) {
          const sql = `UPDATE dentists SET diploma = '${ctx.update.message.document.file_id}' WHERE chat_id = '${ctx.chat.id}'`;
          con.query(sql)
          })
          await ctx.replyWithChatAction('typing')
          await ctx.replyWithHTML(`🎉 Поздравляем, ваш <b>Профиль</b> успешно создан!\n\n❗️ Напоминаю, что клиенты будут связываться с вами через ваш профиль!\n\n❗️ Не забывайте, вся ваша работа достойна похвалы!`)
          await bot.telegram.sendMessage(ctx.chat.id, `📍 Нажмите кнопку ниже, чтобы просмотреть профиль.`, {
            reply_markup: {
              inline_keyboard: [
                [{ text: "Просмотреть профиль", callback_data: "Просмотреть профиль" }]
              ]
            }
          })
        } else {
          ctx.replyWithHTML(`🙏 Пожалуйста, пришлите файл в формате pdf или doc!`)
        }
        return ctx.scene.leave()
      } catch{}
    }
  )

const setname = new WizardScene(
  'setname',
  async (ctx) => {
    try {
      await ctx.replyWithChatAction('typing')
      await ctx.replyWithHTML(`F.I.Sh ni kirting: \nMasalan: Muzaffar Tursunov Jaloliddin o'g'li `)
      return ctx.wizard.next()
    } catch{}
  },
  async (ctx) => {
    // console.log(ctx.message.text)
    const full_name = ctx.message.text // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET full_name = "${ctx.message.text}" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.replyWithChatAction('typing')
    await ctx.replyWithHTML(`🎉 Tabriklayman, sizning Ismingiz muvaffaqiyatli o'zgartirildi!\nSizning to'liq ismingiz: <b>${full_name}</b>!`)
    await bot.telegram.sendMessage(ctx.chat.id, `📍 Profilni ko'rish uchun quyidagi tugmani bosing.`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Profilni ko'rish", callback_data: "Profilni ko'rish" }]
        ]
      }
    })
    return ctx.scene.leave()
  }
)

const setpic = new WizardScene(
  'setpic',
  async (ctx) => {
    try {
      await ctx.replyWithChatAction('typing')
      await bot.telegram.sendMessage(ctx.chat.id, `Profilingiz uchun rasm yuboring.`)
      return ctx.wizard.next()
    } catch{}
  },
  async (ctx) => {
    try {
      // console.log(ctx.update.message.photo[0].file_id) // shu yerdan rasm id-lari bazaga saqlanadi
      con.connect(function (err) {
        const sql = `UPDATE dentists SET photo = '${ctx.update.message.photo[0].file_id}' WHERE chat_id = '${ctx.chat.id}'`;
        con.query(sql)
      })
      await ctx.replyWithChatAction('typing')
      await ctx.replyWithHTML(`🎉 Tabriklayman, sizning profil rasmingiz muvaffaqiyatli o'zgartirildi!`)
      await bot.telegram.sendMessage(ctx.chat.id, `📍 Profilni ko'rish uchun quyidagi tugmani bosing.`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Profilni ko'rish", callback_data: "Profilni ko'rish" }]
          ]
        }
      })
      return ctx.scene.leave()
    } catch (e) {
      console.log("Something went wrong: ",e)
    }
  }
)

const setexperience = new WizardScene(
  'setexperience',
  async (ctx) => {
    try {
      await ctx.replyWithChatAction('typing')
      await ctx.replyWithHTML(`Necha yillik tajribangiz bor?\nMasalan: 3 yillik bo'lsa, 3 yozib qoldiring!`)
      return ctx.wizard.next()
    } catch{}
  },
  async (ctx) => {
    try {
      // console.log(ctx.message.text)
      const experience = ctx.message.text
      con.connect(function (err) {
        const sql = `UPDATE dentists SET experience = '${experience}' WHERE chat_id = '${ctx.chat.id}'`;
        con.query(sql)
      })
      await ctx.replyWithChatAction('typing')
      await ctx.replyWithHTML(`🎉 Tabriklayman, sizning ish tajribangiz muvaffaqiyatli o'zgartirildi!\nSizda <b>${experience}</b> yillik tajriba mavjud!`)
      await bot.telegram.sendMessage(ctx.chat.id, `📍 Profilni ko'rish uchun quyidagi tugmani bosing.`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Profilni ko'rish", callback_data: "Profilni ko'rish" }]
          ]
        }
      })
      return ctx.scene.leave()
    } catch{}
  }
)

const setprice = new WizardScene(
  'setprice',
  async (ctx) => {
    try {
      await ctx.replyWithChatAction('typing')
      await bot.telegram.sendMessage(ctx.chat.id, `💵 Bir martalik qabulingiz narxi qancha?\n\n❗️ Masalan, 50 000 so'm bo'lsa, '50 000' ni yuboring!`)
      return ctx.wizard.next()
    } catch{}
  },
  async (ctx) => {
    try {
      // console.log(ctx.message.text)
      const narx = ctx.message.text
      con.connect(function (err) {
        const sql = `UPDATE dentists SET fee = '${narx}' WHERE chat_id = '${ctx.chat.id}'`;
        con.query(sql)
      })
      await ctx.replyWithChatAction('typing')
      await ctx.replyWithHTML(`🎉 Tabriklayman, sizning qabulingiz narxi muvaffaqiyatli o'zgartirildi!\nBir martalik qabulingiz narxi <b>${narx}</b> so'm!`)
      await bot.telegram.sendMessage(ctx.chat.id, `📍 Profilni ko'rish uchun quyidagi tugmani bosing.`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Profilni ko'rish", callback_data: "Profilni ko'rish" }]
          ]
        }
      })
      return ctx.scene.leave()
    } catch{}
  }
)

const setlocation = new WizardScene(
  'setlocation',
  async (ctx) => {
    try {
      await ctx.replyWithChatAction('typing')
      await bot.telegram.sendMessage(ctx.chat.id, `Ishxonangiz manzilini yuboring.`, {
        reply_markup: {
          keyboard: [
            [{ text: "Manzil yuborish", request_location: true }]
          ],
          one_time_keyboard: true,
          resize_keyboard:true
        }
      })
      return ctx.wizard.next()
    } catch{}
  },
  async (ctx) => {
    try {
      // console.log(ctx.update.message.location.latitude)
      // console.log(ctx.update.message.location.longitude) // shu yerdan locationni bazaga saqliman
      con.connect(function (err) {
        const sql = `UPDATE dentists SET latitude = '${ctx.update.message.location.latitude}', longitude = '${ctx.update.message.location.longitude}' WHERE chat_id = '${ctx.chat.id}'`;
        con.query(sql)
      })
      await ctx.replyWithChatAction('typing')
      await ctx.replyWithHTML(`🎉 Tabriklayman, sizning ish manzilingiz muvaffaqiyatli o'zgartirildi!`)
      await bot.telegram.sendMessage(ctx.chat.id, `📍 Profilni ko'rish uchun quyidagi tugmani bosing.`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Profilni ko'rish", callback_data: "Profilni ko'rish" }]
          ]
        }
      })
      return ctx.scene.leave()
    } catch{}
  }
)

const doctors = new WizardScene(
  'doctors',
  async (ctx) => {
    try {
      // file_id is unique for each individual bot and can't be transferred from one bot to another.
      if (ctx.chat.id == process.env.admin) {
        con.connect(async (err) => {
          const sql = `SELECT * FROM dentists WHERE accepted = 0`;
          con.query(sql, async (err, result) => {
            if (result.length > 0) {
              for (let i = 0; i < result.length; i++){
                if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
                  await bot.telegram.sendPhoto(process.env.admin, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']}\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n\n🔑 Chat id: ${result[i]['chat_id']}`})
                  await bot.telegram.sendDocument(process.env.admin, `${result[i]['diploma']}`)
                }
              }
            } else {
              await bot.telegram.sendMessage(process.env.admin, "Tish Doktor yo'q!")
            }       
          })
        })
        con.connect(async (err) => {
          const sql = `SELECT * FROM dentists WHERE accepted = 2`;
          con.query(sql, async (err, result) => {
            if (result.length > 0) {
              for (let i = 0; i < result.length; i++){
                if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
                  await bot.telegram.sendPhoto(process.env.admin, `${result[i]['photo']}`,{ caption: `🚫 Rejected\n\n👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']}\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n\n🔑 Chat id: ${result[i]['chat_id']}`})
                  await bot.telegram.sendDocument(process.env.admin, `${result[i]['diploma']}`)
                }
              }
            } else {
              await bot.telegram.sendMessage(process.env.admin, "Tish Doktor yo'q!")
            }     
          })
        })
      } else {
        await ctx.replyWithHTML(`Siz admin emassiz!`)
      }
      return ctx.wizard.next()
    } catch{}
  }
)

const type = new WizardScene(
  'type',
  async (ctx) => {
    await ctx.replyWithChatAction('typing')
    await bot.telegram.sendMessage(ctx.chat.id, `Siz kimsiz?`, {
      reply_markup: {
        keyboard: [
          [{text: "Stomotolog"}],
          [{text: "Mijoz"}]
        ],
        one_time_keyboard: true,
        resize_keyboard: true
      }
    })
    return ctx.scene.leave()
  }
)

const typeru = new WizardScene(
    'typeru',
    async (ctx) => {
      await ctx.replyWithChatAction('typing')
      await bot.telegram.sendMessage(ctx.chat.id, `Кто вы?`, {
        reply_markup: {
          keyboard: [
            [{text: "Стоматолог"}],
            [{text: "Пациент"}]
          ],
          one_time_keyboard: true,
          resize_keyboard: true
        }
      })
      return ctx.scene.leave()
    }
)

const mijoz = new WizardScene(
  'mijoz',
  async (ctx) => {
    await bot.telegram.sendMessage(ctx.chat.id, `Sizga qaysi shahardan Tish Doktor kerak?`, {
      reply_markup: {
        keyboard: [
          [{text: "Toshkent sh"}],
          [{text: "Toshkent vil"}],
          [{text: "Andijon vil"}],
          [{text: "Namangan vil"}],
          [{text: "Farg'ona vil"}],
          [{text: "Sirdaryo vil"}],
          [{text: "Jizzax vil"}],
          [{text: "Samarqand vil"}],
          [{text: "Navoiy vil"}],
          [{text: "Qashqadaryo vil"}],
          [{text: "Surxondaryo vil"}],
          [{text: "Buxoro vil"}],
          [{text: "Xorazm vil"}],
          [{text: "◀️ Qaytish"}]
        ],
        one_time_keyboard: true,
        resize_keyboard: true
      }
    })
    return ctx.scene.leave()
  }
)

const mijozru = new WizardScene(
  'mijozru',
  async (ctx) => {
    await bot.telegram.sendMessage(ctx.chat.id, `В каком городе вам нужен стоматолог?`, {
      reply_markup: {
        keyboard: [
          [{text: "Ташкент"}],
          [{text: "Ташкентская область"}],
          [{text: "Андижанская область"}],
          [{text: "Наманганская область"}],
          [{text: "Ферганская область"}],
          [{text: "Сырдарьинская область"}],
          [{text: "Джизакская область"}],
          [{text: "Самаркандская область"}],
          [{text: "Навоийская область"}],
          [{text: "Кашкадарьинская область"}],
          [{text: "Сурхандарьинская область"}],
          [{text: "Бухарская область"}],
          [{text: "Хорезмская область"}],
          [{text: "◀️ Назад"}]
        ],
        one_time_keyboard: true,
        resize_keyboard: true
      }
    })
    return ctx.scene.leave()
  }
)

const stage = new Stage([full_name, experience, setname, setpic, setexperience, setprice, setlocation, doctors, mijoz, type, typeru, mijozru, full_nameru, experienceru])
bot.use(session())
bot.use(stage.middleware())

bot.command("start", async (ctx) => {
  try {
    if (ctx.from.id || ctx.from.first_name || ctx.from.username) {
      con.connect(function(err) {
        const sql = `SELECT COUNT(*) FROM users WHERE chat_id = ${ctx.from.id}`;
        con.query(sql, function (err, result) {
          // console.log(result[0]['COUNT(*)'])
          // console.log(ctx.from.id)
          
          if (result[0]['COUNT(*)'] === 0) {
              const sql = `INSERT INTO users (chat_id, first_name, username) VALUES ("${ctx.from.id}","${ctx.from.first_name}","@${ctx.from.username}")`;
              con.query(sql)
              // console.log("Foydalanuvchi Bazaga Qo'shildi....")
          }
          // else {
              // console.log("Foydalanuvchi Bazada Mavjud ....")
          // }
        });
      });
      con.connect(function(err) {
        const sql = `SELECT COUNT(*) FROM dentists WHERE chat_id = ${ctx.from.id}`;
        con.query(sql, function (err, result) {
          // console.log(result[0]['COUNT(*)'])
          // console.log(ctx.from.id)
          
          if (result[0]['COUNT(*)'] === 0) {
              const sql = `INSERT INTO dentists (chat_id, first_name, username) VALUES ("${ctx.from.id}","${ctx.from.first_name}","@${ctx.from.username}")`;
              con.query(sql)
              // console.log("Пользователь добавлен в базу данных.")
          }
          // else {
              // console.log("Доступно в пользовательской базе ....")
          // }
        });
      });
    }
    let sendMessage = `👋 Здравствуйте, ${ctx.from.first_name}!\n👋 Assalomu aleykum, ${ctx.from.first_name}!\n🇷🇺 Пожалуйста, выберите язык\n🇺🇿 Iltimos, tilni tanlang`;
    await bot.telegram.sendMessage(ctx.chat.id, sendMessage, {
      reply_markup: {
        keyboard: [
          [{text: "🇺🇿 Uz"},{text:"🇷🇺 Ru"}]
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      }
    })
  } catch (e) {
    console.error("Cant handle start command", e)
  }
})

bot.command("/doctors", async (ctx) => {
  try {
    await ctx.scene.enter('doctors')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})

bot.hears("🇺🇿 Uz", async (ctx) => {
  try {
    await ctx.scene.enter('type')
  } catch (e) {
    console.log("Error happened...",e)
  }
})

bot.hears("Stomotolog", async (ctx) => {
  ctx.replyWithChatAction('typing')
  await bot.telegram.sendMessage(ctx.chat.id, `❗️Siz botdan stomotolog sifatida foydalanishingiz uchun ro'yxatdan o'tishingiz zarur!\n\n❗️Sizning ma'lumotlaringiz kartochka ko'rinishida tayyor bo'ladi va bu sizning mijozlaringiz ko'payishini ta'minlaydi!`, {
    reply_markup: {
      keyboard: [
        [{text: "Roziman"}],
        [{text: "◀️ Qaytish"}],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

bot.hears("◀️ Qaytish", async (ctx) => {
    try {
      await ctx.scene.enter("type")
    } catch (e) {
      console.log("Error happened...",e)
    }
})

bot.hears("Roziman", async (ctx) => {
  try {
    await ctx.scene.enter('full_name')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})

bot.hears("🇷🇺 Ru", async (ctx) => {
    try {
      await ctx.scene.enter('typeru')
    } catch (e) {
      console.log("Error happened...",e)
    }
})

bot.hears("Стоматолог", async (ctx) => {
  ctx.replyWithChatAction('typing')
  await bot.telegram.sendMessage(ctx.chat.id, `❗️Вам необходимо зарегистрироваться, чтобы использовать бота как стоматолог!\n\n❗️Ваша информация будет готова в виде карты, и это гарантирует, что ваши клиенты будут увеличиваться!`, {
    reply_markup: {
      keyboard: [
        [{text: "Я согласен"}],
        [{text: "◀️ Назад"}],    
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

bot.hears("◀️ Назад", async (ctx) => {
    try {
      await ctx.scene.enter("typeru")
    } catch (e) {
      console.log("Error happened...",e)
    }
})

bot.hears("Я согласен", async (ctx) => {
  try {
    await ctx.scene.enter('full_nameru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})

bot.hears("📍Toshkent sh", async (ctx) => { 
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Toshkent shahar" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumanda faoliyat olib borasiz?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Yunusobod" }, { text: "📍Olmazor" }],
        [{ text: "📍Sergeli" }, { text: "📍Shayhontohur" }],
        [{ text: "📍Yashnobod" }, { text: "📍Mirzo Ulug'bek" }],
        [{ text: "📍Bektemir" }, { text: "📍Chilonzor" }],
        [{ text: "📍Yakkasaroy" }] ,
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})
// toshkent shahar tumanlari
bot.hears("📍Yunusobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yunusobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Olmazor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Olmazor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Sergeli", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sergeli tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Shayhontohur", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Shayhontohur tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Mirzo Ulug'bek", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Mirzo Ulug'bek tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e) 
  }
})
bot.hears("📍Bektemir", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Bektemir tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Chilonzor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Chilonzor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Yakkasaroy", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yakkasaroy tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Yashnobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yashnobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// toshkent shahar tumanlari

bot.hears("📍Toshkent vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Toshkent viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumanda faoliyat olib borasiz?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Bekobod" }, { text: "📍Bo'stonliq" }],
        [{ text: "📍Bo'ka" }, { text: "📍Chinoz" }],
        [{ text: "📍Ohangaron" }, { text: "📍Qibray" }],
        [{ text: "📍Oqqo'rg'on" }, { text: "📍Piskent" }],
        [{ text: "📍O'rta Chirchiq" }, { text: "📍Quyi Chirchiq" }],
        [{ text: "📍Yangi Yo'l" }, { text: "📍Yuqori Chirchiq" }],
        [{ text: "📍Parkent" },{text: "📍Zangiota"}] ,
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// toshkent viloyati tumanlari
bot.hears("📍Bekobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Bekobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Bo'stonliq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Bo'stonliq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Bo'ka", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Bo'ka tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Chinoz", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Chinoz tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Ohangaron", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Ohangaron tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Qibray", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qibray tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Oqqo'rg'on", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Oqqo'rg'on tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Piskent", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Piskent tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍O'rta Chirchiq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "O'rta Chirchiq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Quyi Chirchiq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Quyi Chirchiq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Yangi Yo'l", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yangi Yo'l tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Yuqori Chirchiq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yuqori Chirchiq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Parkent", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Parkent tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Zangiota", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Zangiota tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// toshkent viloyati tumanlari

bot.hears("📍Andijon vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Andijon viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumanda faoliyat olib borasiz?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Andijon" }, { text: "📍Jalaquduq" }],
        [{ text: "📍Asaka" }, { text: "📍Marhamat" }],
        [{ text: "📍Bo'ston" }, { text: "📍Oltinko'l" }],
        [{ text: "📍Buloqboshi" }, { text: "📍Paxtaobod" }],
        [{ text: "📍Izboskan" }, { text: "📍Shaxrixon" }],
        [{ text: "📍Xo'jaobod" }, { text: "📍Ulug'nor" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// andijon viloyati tumanlari
bot.hears("📍Andijon", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Andijon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Jalaquduq", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Jalaquduq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Marhamat", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Marhamat tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Asaka", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Asaka tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Bo'ston", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Bo'ston tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Oltinko'l", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Oltinko'l tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Buloqboshi", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Buloqboshi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Paxtaobod", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Paxtaobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Izboskan", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Izboskan tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Shaxrixon", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Shaxrixon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Xo'jaobod", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Xo'jaobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Ulug'nor", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Ulug'nor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// andijon viloyati tumanlari

bot.hears("📍Namangan vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Namangan viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumanda faoliyat olib borasiz?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Chortoq" }, { text: "📍Mingbuloq" }],
        [{ text: "📍Chust" }, { text: "📍Namangan shahri" }],
        [{ text: "📍Kosonsoy" }, { text: "📍Namangan" }],
        [{ text: "📍Uychi" }, { text: "📍Norin" }],
        [{ text: "📍Yangiqo'rg'on" }, { text: "📍Pop" }],
        [{ text: "📍Uchqo'rg'on" }, { text: "📍To'raqo'rg'on" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// namangan viloyati tumanlari
bot.hears("📍Chortoq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Chortoq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Chust", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Chust tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Mingbuloq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Mingbuloq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Namangan shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Namangan shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Kosonsoy", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Kosonsoy tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Namangan", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Namangan tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Uychi", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Uychi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Norin", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Norin tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Yangiqo'rg'on", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yangiqo'rg'on tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Pop", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Pop tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Uchqo'rg'on", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Uchqo'rg'on tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍To'raqo'rg'on", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "To'raqo'rg'on tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// namangan viloyati tumanlari

bot.hears("📍Farg'ona vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Farg'ona viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumanda faoliyat olib borasiz?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Bag'dod" }, { text: "📍Beshariq" }],
        [{ text: "📍Dang'ara" }, { text: "📍Buvayda" }],
        [{ text: "📍Farg'ona" }, { text: "📍Furqat" }],
        [{ text: "📍O'zbekiston" }, { text: "📍Oltiariq" }],
        [{ text: "📍Qo'shtepa" }, { text: "📍Quva" }],
        [{ text: "📍So'x" }, { text: "📍Rishton" }],
        [{ text: "📍Uchko'prik" }, { text: "📍Toshloq" }],
        [{ text: "📍Yozyovon" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// farg'ona viloyati tumanlari
bot.hears("📍Bag'dod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Bag'dod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Beshariq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Beshariq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Dang'ara", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Dang'ara tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Buvayda", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Buvayda tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Farg'ona", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Farg'ona tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Furqat", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Furqat tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍O'zbekiston", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "O'zbekiston tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Oltiariq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Oltiariq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Qo'shtepa", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qo'shtepa tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Quva", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Quva tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍So'x", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "So'x tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Rishton", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Rishton tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Uchko'prik", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Uchko'prik tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Toshloq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Toshloq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Yozyovon", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yozyovon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// farg'ona viloyati tumanlari

bot.hears("📍Sirdaryo vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Sirdaryo viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumanda faoliyat olib borasiz?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Sirdaryo" }, { text: "📍Sayxunobod" }],
        [{ text: "📍Guliston" }, { text: "📍Oqoltin" }],
        [{ text: "📍Boyovut" }, { text: "📍Mexnatobod" }],
        [{ text: "📍Sharof Rashidov" }, { text: "📍Mirzaobod" }],
        [{ text: "📍Hovos" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// sirdaryo viloyati tumanlari
bot.hears("📍Sirdaryo", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sirdaryo tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Sayxunobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sayxunobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Guliston", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Guliston tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Oqoltin", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Oqoltin tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Boyovut", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Boyovut tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Mexnatobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Mexnatobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Sharof Rashidov", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sharof Rashidov tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Mirzaobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Mirzaobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Hovos", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Hovos tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// sirdaryo viloyati tumanlari

bot.hears("📍Jizzax vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Jizzax viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumanda faoliyat olib borasiz?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Arnasoy" }, { text: "📍Mirzacho'l" }],
        [{ text: "📍Baxmal" }, { text: "📍Paxtakor" }],
        [{ text: "📍Do'stlik" }, { text: "📍Yangiobod" }],
        [{ text: "📍Forish" }, { text: "📍Zarafshon" }],
        [{ text: "📍G'allaorol" }, { text: "📍Zarband" }],
        [{ text: "📍Jizzax shahar" }, { text: "📍Zomin" }],
        [{ text: "📍Jizzax" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// jizzax viloyati tumanlari
bot.hears("📍Arnasoy", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Arnasoy tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Mirzacho'l", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Mirzacho'l tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Baxmal", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Baxmal tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Paxtakor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Paxtakor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Do'stlik", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Do'stlik tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Yangiobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yangiobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Forish", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Forish tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Zarafshon", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Zarafshon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍G'allaorol", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "G'allaorol tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Zarband", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Zarband tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Jizzax shahar", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Jizzax shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Zomin", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Zomin tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Jizzax", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Jizzax tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// jizzax viloyati tumanlari

bot.hears("📍Samarqand vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Samarqand viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumanda faoliyat olib borasiz?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Bulung'ur" }, { text: "📍Ishtixon" }],
        [{ text: "📍Jomboy" }, { text: "📍Kattaqo'rg'on shahri" }],
        [{ text: "📍Narpay" }, { text: "📍Kattaqo'rg'on" }],
        [{ text: "📍Nurobod" }, { text: "📍Oqdaryo" }],
        [{ text: "📍Paxtachi" }, { text: "📍Past Darg'om" }],
        [{ text: "📍Poyariq" }, { text: "📍Qo'shrabot" }],
        [{ text: "📍Toyloq" }, { text: "📍Samarqand shahri" }],
        [{ text: "📍Urgut" }, { text: "📍Samarqand" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// samarqand viloyati tumanlari
bot.hears("📍Bulung'ur", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Bulung'ur tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Ishtixon", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Ishtixon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Jomboy", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Jomboy tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Kattaqo'rg'on shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Kattaqo'rg'on tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Narpay", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Narpay tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Kattaqo'rg'on", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Kattaqo'rg'on tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Nurobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Nurobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Oqdaryo", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Oqdaryo tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Paxtachi", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Paxtachi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Past Darg'om", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Past Darg'om tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Poyariq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Poyariq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Qo'shrabot", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qo'shrabot tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Toyloq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Toyloq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Samarqand shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Samarqand shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Urgut", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Urgut tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Samarqand", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Samarqand tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// samarqand viloyati tumanlari

bot.hears("📍Navoiy vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Navoiy viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumanda faoliyat olib borasiz?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Konimex" }, { text: "📍Navbahor" }],
        [{ text: "📍Karmana" }, { text: "📍Nurota" }],
        [{ text: "📍Tomdi" }, { text: "📍Uchquduq" }],
        [{ text: "📍Xatirchi" }, { text: "📍Qiziltepa" }],
        [{ text: "📍Qiziltepa shahri" }, { text: "📍Zarafshon shahri" }],
        [{ text: "📍Navoiy shahri" }, { text: "📍Nurota shahri" }],
        [{ text: "📍Konimex shaharcha" }, { text: "📍Uchquduq shahri" }],
        [{ text: "📍Langar shaharcha" }, { text: "📍Malikrabot shaharcha" }],
        [{ text: "📍Tinchlik shaharcha" }, { text: "📍Muruntov shaharcha" }],
        [{ text: "📍Shalqar shaharcha" }, { text: "📍Yangirabot shaharcha" }],
        [{ text: "📍G'ozg'on shaharcha" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// navoiy viloyati tumanlari
bot.hears("📍Konimex", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Konimex tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Navbahor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Navbahor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Karmana", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Karmana tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Nurota", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Nurota tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Tomdi", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Tomdi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Uchquduq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Uchquduq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Xatirchi", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Xatirchi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Qiziltepa", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qiziltepa tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Qiziltepa shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qiziltepa shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Zarafshon shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Zarafshon shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Navoiy shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Navoiy shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Nurota shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Nurota shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Konimex shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Konimex shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Uchquduq shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Uchquduq shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Langar shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Langar shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Malikrabot shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Malikrabot shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Tinchlik shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Tinchlik shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Muruntov shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Muruntov shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Shalqar shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Shalqar shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Yangirabot shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yangirabot shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍G'ozg'on shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "G'ozg'on shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// navoiy viloyati tumanlari

bot.hears("📍Qashqadaryo vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Qashqadaryo viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumanda faoliyat olib borasiz?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Chiroqchi" }, { text: "📍Dehqonobod" }],
        [{ text: "📍G'uzor" }, { text: "📍Kasbi" }],
        [{ text: "📍Kitob" }, { text: "📍Koson" }],
        [{ text: "📍Mirishkor" }, { text: "📍Muborak" }],
        [{ text: "📍Nishon" }, { text: "📍Qamashi" }],
        [{ text: "📍Qarshi shahri" }, { text: "📍Qarshi" }],
        [{ text: "📍Shahrisabz" }, { text: "📍Yakkabog'" }],
        [{ text: "📍Ko'kdala" }, { text: "📍Beshkent shahri" }],
        [{ text: "📍Kitop shahri" }, { text: "📍Koson shahri" }],
        [{ text: "📍Tallimarjon shahri" }, { text: "📍Muborak shahri" }],
        [{ text: "📍Shahrisabz shahri" }, { text: "📍Chiroqchi shahri" }],
        [{ text: "📍Yakkabog' shahri" }, { text: "📍Yangi Nishon shahri" }],
        [{ text: "📍G'uzor shahri" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// qashqadaryo viloyati tumanlari
bot.hears("📍Chiroqchi", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Chiroqchi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Dehqonobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Dehqonobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍G'uzor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "G'uzor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Kasbi", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Kasbi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Kitob", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Kitob tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Koson", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Koson tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Mirishkor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Mirishkor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Muborak", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Muborak tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Nishon", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Nishon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Qamashi", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qamashi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Qarshi shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qarshi shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Qarshi", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qarshi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Shahrisabz", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Shahrisabz tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Yakkabog'", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yakkabog' tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Ko'kdala", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Ko'kdala tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Beshkent shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Beshkent shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Kitop shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Kitob shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Koson shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Koson shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Tallimarjon shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Tallimarjon shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Muborak shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Muborak shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Shahrisabz shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Shahrisabz shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Chiroqchi shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Chiroqchi shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Yakkabog' shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yakkabog' shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Yangi Nishon shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yangi Nishon shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍G'uzor shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "G'uzor shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// qashqadaryo viloyati tumanlari

bot.hears("📍Surxondaryo vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Surxondaryo viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumanda faoliyat olib borasiz?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Angor" }, { text: "📍Bandixon" }],
        [{ text: "📍Boysun" }, { text: "📍Denov" }],
        [{ text: "📍Jarqo'rg'on" }, { text: "📍Muzrabot" }],
        [{ text: "📍Oltinsoy" }, { text: "📍Sariosiyo" }],
        [{ text: "📍Termiz" }, { text: "📍Uzun" }],
        [{ text: "📍Sherobod" }, { text: "📍Sho'rchi" }],
        [{ text: "📍Qiziriq" }, { text: "📍Qumqo'rg'on" }],
        [{ text: "📍Boysun shahri" }, { text: "📍Denov shahri" }],
        [{ text: "📍Jarqo'rg'on shahri" }, { text: "📍Termiz shahri" }],
        [{ text: "📍Sharg'un shahri" }, { text: "📍Sherobod shahri" }],
        [{ text: "📍Qumqo'rg'on shahri" }, { text: "📍Sho'rchi shahri" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// surxondaryo viloyati tumanlari
bot.hears("📍Angor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Angor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Bandixon", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Bandixon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Boysun", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Boysun tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Denov", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Denov tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Jarqo'rg'on", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Jarqo'rg'on tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Muzrabot", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Muzrabot tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Oltinsoy", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Oltinsoy tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Sariosiyo", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sariosiyo tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Termiz", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Termiz tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Uzun", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Uzun tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Sherobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sherobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Sho'rchi", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sho'rchi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Qiziriq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qiziriq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Qumqo'rg'on", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qumqo'rg'on tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Boysun shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Boysun shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Denov shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Denov shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Jarqo'rg'on shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Jarqo'rg'on shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Termiz shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Termiz shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Sharg'un shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sharg'un shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Sherobod shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sherobod shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Qumqo'rg'on shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qumqo'rg'on shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Sho'rchi shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sho'rchi shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// surxondaryo viloyati tumanlari

bot.hears("📍Buxoro vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Buxoro viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumanda faoliyat olib borasiz?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Buxoro" }, { text: "📍Vobkent" }],
        [{ text: "📍Jondor" }, { text: "📍Kogon" }],
        [{ text: "📍Olot" }, { text: "📍Peshku" }],
        [{ text: "📍Romitan" }, { text: "📍Shofirkon" }],
        [{ text: "📍Qorovulbozor" }, { text: "📍Qorako'l" }],
        [{ text: "📍G'ijduvon" }, { text: "📍Buxoro shahri" }],
        [{ text: "📍Galaosiyo shahri" }, { text: "📍Vobkent shahri" }],
        [{ text: "📍Gazli shahri" }, { text: "📍Kogon shahri" }],
        [{ text: "📍Olot shahri" }, { text: "📍Romitan shahri" }],
        [{ text: "📍Shofirkon shahri" }, { text: "📍Qorako'l shahri" }],
        [{ text: "📍Qorovulbozor shahri" }, { text: "📍G'ijduvon shahri" }],
        [{ text: "📍Jondor shaharcha" }, { text: "📍Zafarobod shaharcha" }],
        [{ text: "📍Yangibozor shaharcha" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// buxoro viloyarti tumanlari
bot.hears("📍Buxoro", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Buxoro tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Vobkent", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Vobkent tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Jondor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Jondor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Kogon", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Kogon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Olot", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Olot tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Peshku", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Peshku tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Romitan", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Romitan tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Shofirkon", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Shofirkon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Qorovulbozor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qorovulbozor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Qorako'l", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qorako'l tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍G'ijduvon", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "G'ijduvon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Buxoro shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Buxoro shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Galaosiyo shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Galaosiyo shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Vobkent shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Vobkent shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Gazli shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Gazli shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Kogon shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Kogon shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Olot shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Olot shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Romitan shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Romitan shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Shofirkon shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Shofirkon shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Qorako'l shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qorako'l shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Qorovulbozor shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qorovulbozor shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍G'ijduvon shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "G'ijduvon shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Jondor shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Jondor shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Zafarobod shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Zafarobod shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Yangibozor shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yangibozor shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// buxoro viloyarti tumanlari

bot.hears("📍Xorazm vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Xorazm viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumanda faoliyat olib borasiz?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Urganch" }, { text: "📍Hazorasp" }],
        [{ text: "📍Xonqa" }, { text: "📍Qo'shko'pir" }],
        [{ text: "📍Bog'ot" }, { text: "📍Shovot" }],
        [{ text: "📍Gurlan" }, { text: "📍Xiva" }],
        [{ text: "📍Urganch shahri" }, { text: "📍Yangiariq" }],
        [{ text: "📍Yangibozor" }, { text: "📍Xiva shahri" }],
        [{ text: "📍Tuproqqal'a" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// xorazm viloyati tumanlari
bot.hears("📍Urganch", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Urganch tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Hazorasp", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Hazorasp tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Xonqa", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Xonqa tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Qo'shko'pir", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qo'shko'pir tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Bog'ot", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Bog'ot tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Shovot", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Shovot tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Gurlan", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Gurlan tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Xiva", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Xiva tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Urganch shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Urganch shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Yangiariq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yangiariq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Yangibozor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yangibozor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Xiva shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Xiva shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Tuproqqal'a", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Tuproqqal'a tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// xorazm viloyati tumanlari

bot.hears("Mijoz", async (ctx) => {
  try {
    await ctx.scene.enter('mijoz')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})

bot.hears("Пациент", async (ctx) => {
  try {
    await ctx.scene.enter('mijozru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})

bot.hears("◀️ Orqaga", async (ctx) => {
  try {
    await ctx.scene.enter('mijoz')
  } catch (e) {
    console.log("Something went wrong: ", e)
  }
})

bot.hears("◀️Назад", async (ctx) => {
  try {
    await ctx.scene.enter('mijozru')
  } catch (e) {
    console.log("Something went wrong: ", e)
  }
})

bot.hears("Toshkent sh", async (ctx) => {
  //shu yerdan bazaga tushadi
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumandan Tish Doktori kerak?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Yunusobod" }, { text: "Olmazor" }],
        [{ text: "Sergeli" }, { text: "Shayhontohur" }],
        [{ text: "Yashnobod" }, { text: "Mirzo Ulug'bek" }],
        [{ text: "Bektemir" }, { text: "Chilonzor" }],
        [{ text: "Yakkasaroy" }, { text: "◀️ Orqaga" }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// toshkent shahar tumanlari
bot.hears("Yunusobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yunusobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n ☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Olmazor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Olmazor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Sergeli", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sergeli tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Shayhontohur", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Shayhontohur tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Mirzo Ulug'bek", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Mirzo Ulug'bek tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Bektemir", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Bektemir tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Chilonzor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Chilonzor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, {
                caption: `
👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n
🌆 Shahar: ${result[i]['city']}\n
✅ Tuman: ${result[i]['district']}\n
👁 Tajriba: ${result[i]['experience']} yil\n
💵 Qabul narxi: ${result[i]['fee']} so'm\n
☎️ Murojaat uchun:  +${result[i]['phone']}\n
📲 Telegram:  ${result[i]['username']}\n\n
❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy
        ` })
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Yakkasaroy", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yakkasaroy tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Yashnobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yashnobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// toshkent shahar tumanlari

bot.hears("Toshkent vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumandan Tish Doktori kerak?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Bekobod" }, { text: "Bo'stonliq" }],
        [{ text: "Bo'ka" }, { text: "Chinoz" }],
        [{ text: "Ohangaron" }, { text: "Qibray" }],
        [{ text: "Oqqo'rg'on" }, { text: "Piskent" }],
        [{ text: "O'rta Chirchiq" }, { text: "Quyi Chirchiq" }],
        [{ text: "Yangi Yo'l" }, { text: "Yuqori Chirchiq" }],
        [{ text: "Parkent" }, { text: "Zangiota" }],
        [{ text: "◀️ Orqaga" }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// toshkent viloyati tumanlari
bot.hears("Bekobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Bekobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Bo'stonliq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Bo'stonliq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Bo'ka", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Bo'ka tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Chinoz", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Chinoz tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Ohangaron", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Ohangaron tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Qibray", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qibray tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Oqqo'rg'on", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Oqqo'rg'on tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Piskent", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Piskent tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("O'rta Chirchiq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "O'rta Chirchiq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Quyi Chirchiq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Quyi Chirchiq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Yangi Yo'l", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yangi Yo'l tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Yuqori Chirchiq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yuqori Chirchiq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Parkent", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Parkent tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Zangiota", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Zangiota tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// toshkent viloyati tumanlari

bot.hears("Andijon vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumandan Tish Doktori kerak?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Andijon" }, { text: "Jalaquduq" }],
        [{ text: "Asaka" }, { text: "Marhamat" }],
        [{ text: "Bo'ston" }, { text: "Oltinko'l" }],
        [{ text: "Buloqboshi" }, { text: "Paxtaobod" }],
        [{ text: "Izboskan" }, { text: "Shaxrixon" }],
        [{ text: "Xo'jaobod" }, { text: "Ulug'nor" }],
        [{ text: "◀️ Orqaga" }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// andijon viloyati tumanlari
bot.hears("Andijon", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Andijon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Jalaquduq", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    // await ctx.scene.enter('experience')
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Jalaquduq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Marhamat", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    // await ctx.scene.enter('experience')
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Marhamat tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Asaka", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    // await ctx.scene.enter('experience')
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Asaka tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Bo'ston", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    // await ctx.scene.enter('experience')
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Bo'ston tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `
👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n
🌆 Shahar: ${result[i]['city']}\n
✅ Tuman: ${result[i]['district']}\n
👁 Tajriba: ${result[i]['experience']} yil\n
💵 Qabul narxi: ${result[i]['fee']} so'm\n 
☎️ Murojaat uchun:  +${result[i]['phone']}\n
📲 Telegram:  ${result[i]['username']}\n\n
❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy
        ` })
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Oltinko'l", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    // await ctx.scene.enter('experience')
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Oltinko'l tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Buloqboshi", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    // await ctx.scene.enter('experience')
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Buloqboshi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Paxtaobod", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    // await ctx.scene.enter('experience')
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Paxtaobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Izboskan", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    // await ctx.scene.enter('experience')
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Izboskan tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Shaxrixon", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    // await ctx.scene.enter('experience')
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Shaxrixon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Xo'jaobod", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    // await ctx.scene.enter('experience')
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Xo'jaobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Ulug'nor", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    // await ctx.scene.enter('experience')
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Ulug'nor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// andijon viloyati tumanlari

bot.hears("Namangan vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumandan Tish Doktori kerak?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Chortoq" }, { text: "Mingbuloq" }],
        [{ text: "Chust" }, { text: "Namangan shahri" }],
        [{ text: "Kosonsoy" }, { text: "Namangan" }],
        [{ text: "Uychi" }, { text: "Norin" }],
        [{ text: "Yangiqo'rg'on" }, { text: "Pop" }],
        [{ text: "Uchqo'rg'on" }, { text: "To'raqo'rg'on" }],
        [{ text: "◀️ Orqaga" }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// namangan viloyati tumanlari
bot.hears("Chortoq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Chortoq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Chust", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Chust tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Mingbuloq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Mingbuloq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Namangan shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Namangan shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Kosonsoy", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Kosonsoy tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Namangan", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Namangan tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Uychi", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Uychi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Norin", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Norin tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Yangiqo'rg'on", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yangiqo'rg'on tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Pop", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Pop tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Uchqo'rg'on", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Uchqo'rg'on tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("To'raqo'rg'on", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "To'raqo'rg'on tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// namangan viloyati tumanlari

bot.hears("Farg'ona vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumandan Tish Doktori kerak?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Bag'dod" }, { text: "Beshariq" }],
        [{ text: "Dang'ara" }, { text: "Buvayda" }],
        [{ text: "Farg'ona" }, { text: "Furqat" }],
        [{ text: "O'zbekiston" }, { text: "Oltiariq" }],
        [{ text: "Qo'shtepa" }, { text: "Quva" }],
        [{ text: "So'x" }, { text: "Rishton" }],
        [{ text: "Uchko'prik" }, { text: "Toshloq" }],
        [{ text: "Yozyovon" },{ text: "◀️ Orqaga" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// farg'ona viloyati tumanlari
bot.hears("Bag'dod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Bag'dod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Beshariq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Beshariq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Dang'ara", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Dang'ara tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Buvayda", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Buvayda tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Farg'ona", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Farg'ona tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Furqat", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Furqat tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("O'zbekiston", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "O'zbekiston tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Oltiariq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Oltiariq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Qo'shtepa", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qo'shtepa tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Quva", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Quva tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("So'x", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "So'x tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Rishton", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Rishton tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Uchko'prik", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Uchko'prik tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Toshloq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Toshloq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Yozyovon", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yozyovon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// farg'ona viloyati tumanlari

bot.hears("Sirdaryo vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumandan Tish Doktori kerak?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Sirdaryo" }, { text: "Sayxunobod" }],
        [{ text: "Guliston" }, { text: "Oqoltin" }],
        [{ text: "Boyovut" }, { text: "Mexnatobod" }],
        [{ text: "Sharof Rashidov" }, { text: "Mirzaobod" }],
        [{ text: "Hovos" },{ text: "◀️ Orqaga" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// sirdaryo viloyati tumanlari
bot.hears("Sirdaryo", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sirdaryo tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Sayxunobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sayxunobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Guliston", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Guliston tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Oqoltin", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Oqoltin tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Boyovut", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Boyovut tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Mexnatobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Mexnatobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Sharof Rashidov", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sharof Rashidov tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Mirzaobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Mirzaobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Hovos", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Hovos tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// sirdaryo viloyati tumanlari


bot.hears("Jizzax vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumandan Tish Doktori kerak?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Arnasoy" }, { text: "Mirzacho'l" }],
        [{ text: "Baxmal" }, { text: "Paxtakor" }],
        [{ text: "Do'stlik" }, { text: "Yangiobod" }],
        [{ text: "Forish" }, { text: "Zarafshon" }],
        [{ text: "G'allaorol" }, { text: "Zarband" }],
        [{ text: "Jizzax shahar" }, { text: "Zomin" }],
        [{ text: "Jizzax" },{ text: "◀️ Orqaga" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// jizzax viloyati tumanlari
bot.hears("Arnasoy", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Arnasoy tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Mirzacho'l", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Mirzacho'l tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Baxmal", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Baxmal tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Paxtakor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Paxtakor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Do'stlik", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Do'stlik tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Yangiobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yangiobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Forish", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Forish tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Zarafshon", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Zarafshon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("G'allaorol", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "G'allaorol tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Zarband", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Zarband tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Jizzax shahar", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Jizzax shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Zomin", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Zomin tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Jizzax", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Jizzax tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// jizzax viloyati tumanlari


bot.hears("Samarqand vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumandan Tish Doktori kerak?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Bulung'ur" }, { text: "Ishtixon" }],
        [{ text: "Jomboy" }, { text: "Kattaqo'rg'on shahri" }],
        [{ text: "Narpay" }, { text: "Kattaqo'rg'on" }],
        [{ text: "Nurobod" }, { text: "Oqdaryo" }],
        [{ text: "Paxtachi" }, { text: "Past Darg'om" }],
        [{ text: "Poyariq" }, { text: "Qo'shrabot" }],
        [{ text: "Toyloq" }, { text: "Samarqand shahri" }],
        [{ text: "Urgut" }, { text: "Samarqand" }],
        [{ text: "◀️ Orqaga" }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// samarqand viloyati tumanlari
bot.hears("Bulung'ur", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Bulung'ur tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Ishtixon", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Ishtixon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Jomboy", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Jomboy tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Kattaqo'rg'on shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Kattaqo'rg'on shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Narpay", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Narpay tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Kattaqo'rg'on", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Kattaqo'rg'on tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Nurobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Nurobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Oqdaryo", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Oqdaryo tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Paxtachi", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Paxtachi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Past Darg'om", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Past Darg'om tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Poyariq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Poyariq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Qo'shrabot", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qo'shrabot tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Toyloq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Toyloq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Samarqand shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Samarqand shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Urgut", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Urgut tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Samarqand", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Samarqand tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// samarqand viloyati tumanlari

bot.hears("Navoiy vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumandan Tish Doktori kerak?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Konimex" }, { text: "Navbahor" }],
        [{ text: "Karmana" }, { text: "Nurota" }],
        [{ text: "Tomdi" }, { text: "Uchquduq" }],
        [{ text: "Xatirchi" }, { text: "Qiziltepa" }],
        [{ text: "Qiziltepa shahri" }, { text: "Zarafshon shahri" }],
        [{ text: "Navoiy shahri" }, { text: "Nurota shahri" }],
        [{ text: "Konimex shaharcha" }, { text: "Uchquduq shahri" }],
        [{ text: "Langar shaharcha" }, { text: "Malikrabot shaharcha" }],
        [{ text: "Tinchlik shaharcha" }, { text: "Muruntov shaharcha" }],
        [{ text: "Shalqar shaharcha" }, { text: "Yangirabot shaharcha" }],
        [{ text: "G'ozg'on shaharcha" },{ text: "◀️ Orqaga" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// navoiy viloyati tumanlari
bot.hears("Konimex", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Konimex tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Navbahor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Navbahor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Karmana", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Karmana tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Nurota", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Nurota tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Tomdi", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Tomdi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Uchquduq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Uchquduq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Xatirchi", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Xatirchi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Qiziltepa", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qiziltepa tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Qiziltepa shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qiziltepa shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Zarafshon shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Zarafshon shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Navoiy shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Navoiy shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Nurota shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Nurota shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Konimex shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Konimex shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Uchquduq shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Uchquduq shahri tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Langar shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Langar shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Malikrabot shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Malikrabot shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Tinchlik shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Tinchlik shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Muruntov shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Muruntov shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Shalqar shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Shalqar shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Yangirabot shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yangirabot shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("G'ozg'on shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "G'ozg'on shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// navoiy viloyati tumanlari

bot.hears("Qashqadaryo vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumandan Tish Doktori kerak?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Chiroqchi" }, { text: "Dehqonobod" }],
        [{ text: "G'uzor" }, { text: "Kasbi" }],
        [{ text: "Kitob" }, { text: "Koson" }],
        [{ text: "Mirishkor" }, { text: "Muborak" }],
        [{ text: "Nishon" }, { text: "Qamashi" }],
        [{ text: "Qarshi shahri" }, { text: "Qarshi" }],
        [{ text: "Shahrisabz" }, { text: "Yakkabog'" }],
        [{ text: "Ko'kdala" }, { text: "Beshkent shahri" }],
        [{ text: "Kitop shahri" }, { text: "Koson shahri" }],
        [{ text: "Tallimarjon shahri" }, { text: "Muborak shahri" }],
        [{ text: "Shahrisabz shahri" }, { text: "Chiroqchi shahri" }],
        [{ text: "Yakkabog' shahri" }, { text: "Yangi Nishon shahri" }],
        [{ text: "G'uzor shahri" },{ text: "◀️ Orqaga" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// qashqadaryo viloyati tumanlari
bot.hears("Chiroqchi", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Chiroqchi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Dehqonobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Dehqonobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("G'uzor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "G'uzor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Kasbi", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Kasbi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Kitob", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Kitob tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Koson", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Koson tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Mirishkor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Mirishkor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Muborak", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Muborak tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Nishon", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Nishon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Qamashi", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qamashi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Qarshi shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qarshi shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Qarshi", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qarshi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Shahrisabz", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Shahrisabz tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Yakkabog", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yakkabog' tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Ko'kdala", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Ko'kdala tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Beshkent shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Beshkent shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Kitop shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Kitop shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Koson shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Koson shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Tallimarjon shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Tallimarjon shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Muborak shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Muborak shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Shahrisabz shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Shahrisabz shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Chiroqchi shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Chiroqchi shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Yakkabog' shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yakkabog' shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Yangi Nishon shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yangi Nishon shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("G'uzor shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "G'uzor shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// qashqadaryo viloyati tumanlari

bot.hears("Surxondaryo vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumandan Tish Doktori kerak?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Angor" }, { text: "Bandixon" }],
        [{ text: "Boysun" }, { text: "Denov" }],
        [{ text: "Jarqo'rg'on" }, { text: "Muzrabot" }],
        [{ text: "Oltinsoy" }, { text: "Sariosiyo" }],
        [{ text: "Termiz" }, { text: "Uzun" }],
        [{ text: "Sherobod" }, { text: "Sho'rchi" }],
        [{ text: "Qiziriq" }, { text: "Qumqo'rg'on" }],
        [{ text: "Boysun shahri" }, { text: "Denov shahri" }],
        [{ text: "Jarqo'rg'on shahri" }, { text: "Termiz shahri" }],
        [{ text: "Sharg'un shahri" }, { text: "Sherobod shahri" }],
        [{ text: "Qumqo'rg'on shahri" }, { text: "Sho'rchi shahri" }],
        [{ text: "◀️ Orqaga" }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// surxondaryo viloyati tumanlari
bot.hears("Angor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Angor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Bandixon", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Bandixon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Boysun", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Boysun tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Denov", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Denov tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Jarqo'rg'on", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Jarqo'rg'on tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Muzrabot", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Muzrabot tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Oltinsoy", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Oltinsoy tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Sariosiyo", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sariosiyo tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Termiz", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Termiz tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Uzun", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Uzun tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Sherobod", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sherobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Sho'rchi", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sho'rchi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Qiziriq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qiziriq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Qumqo'rg'on", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qumqo'rg'on tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Boysun shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Boysun shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Denov shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Denov shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Jarqo'rg'on shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Jarqo'rg'on shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Termiz shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Termiz shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Sharg'un shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sharg'un shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Sherobod shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sherobod shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Qumqo'rg'on shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qumqo'rg'on shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Sho'rchi shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sho'rchi shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// surxondaryo viloyati tumanlari

bot.hears("Buxoro vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumandan Tish Doktori kerak?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Buxoro" }, { text: "Vobkent" }],
        [{ text: "Jondor" }, { text: "Kogon" }],
        [{ text: "Olot" }, { text: "Peshku" }],
        [{ text: "Romitan" }, { text: "Shofirkon" }],
        [{ text: "Qorovulbozor" }, { text: "Qorako'l" }],
        [{ text: "G'ijduvon" }, { text: "Buxoro shahri" }],
        [{ text: "Galaosiyo shahri" }, { text: "Vobkent shahri" }],
        [{ text: "Gazli shahri" }, { text: "Kogon shahri" }],
        [{ text: "Olot shahri" }, { text: "Romitan shahri" }],
        [{ text: "Shofirkon shahri" }, { text: "Qorako'l shahri" }],
        [{ text: "Qorovulbozor shahri" }, { text: "G'ijduvon shahri" }],
        [{ text: "Jondor shaharcha" }, { text: "Zafarobod shaharcha" }],
        [{ text: "Yangibozor shaharcha" },{ text: "◀️ Orqaga" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// buxoro viloyarti tumanlari
bot.hears("Buxoro", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Buxoro tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Vobkent", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Vobkent tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Jondor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Jondor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Kogon", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Kogon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Olot", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Olot tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Peshku", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Peshku tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Romitan", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Romitan tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Shofirkon", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Shofirkon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Qorovulbozor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qorovulbozor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Qorako'l", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qorako'l tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("G'ijduvon", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "G'ijduvon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Buxoro shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Buxoro shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Galaosiyo shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Galaosiyo shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Vobkent shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Vobkent shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Gazli shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Gazli shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Kogon shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Kogon shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Olot shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Olot shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Romitan shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Romitan shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Shofirkon shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Shofirkon shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Qorako'l shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qorako'l shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Qorovulbozor shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qoravulbozor shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("G'ijduvon shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "G'ijduvon shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Jondor shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Jondor shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Zafarobod shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Zafarobod shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Yangibozor shaharcha", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yangibozor shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// buxoro viloyarti tumanlari

bot.hears("Xorazm vil", async (ctx) => {
  //shu yerdan bazaga tushadi
  await bot.telegram.sendMessage(ctx.chat.id, `Qaysi tumandan Tish Doktori kerak?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Urganch" }, { text: "Hazorasp" }],
        [{ text: "Xonqa" }, { text: "Qo'shko'pir" }],
        [{ text: "Bog'ot" }, { text: "Shovot" }],
        [{ text: "Gurlan" }, { text: "Xiva" }],
        [{ text: "Urganch shahri" }, { text: "Yangiariq" }],
        [{ text: "Yangibozor" }, { text: "Xiva shahri" }],
        [{ text: "Tuproqqal'a" },{ text: "◀️ Orqaga" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// xorazm viloyati tumanlari
bot.hears("Urganch", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Urganch tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Hazorasp", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Hazorasp tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Xonqa", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Xonqa tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Qo'shko'pir", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qo'shko'pir tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Bog'ot", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Bog'ot tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Shovot", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Shovot tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Gurlan", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Gurlan tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Xiva", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Xiva tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Urganch shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Urganch shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Yangiariq", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yangiariq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Yangibozor", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yangibozor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Xiva shahri", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Xiva shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Tuproqqal'a", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Tuproqqal'a tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`,{ caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Shahar: ${result[i]['city']}\n✅ Tuman: ${result[i]['district']}\n👁 Tajriba: ${result[i]['experience']} yil\n💵 Qabul narxi: ${result[i]['fee']} so'm\n☎️ Murojaat uchun:  +${result[i]['phone']}\n📲 Telegram:  ${result[i]['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 Kechirasiz bu tumandan Tish Doktorlar hali ro'yxatdan o'tishmadi :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// xorazm viloyati tumanlari


bot.hears("📍Ташкент", async (ctx) => { 
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Toshkent shahar" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Юнусабадский район" }, { text: "📍Алмазарский район" }],
        [{ text: "📍Сергелийский район" }, { text: "📍Шайхонтохурский район" }],
        [{ text: "📍Яшнабадский район" }, { text: "📍Мирзо Улугбекский район" }],
        [{ text: "📍Бектемирский район" }, { text: "📍Чиланзарский район" }],
        [{ text: "📍Яккасарайский район" }] ,
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})
// toshkent shahar tumanlari
bot.hears("📍Юнусабадский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yunusobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Алмазарский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Olmazor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Сергелийский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sergeli tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Шайхонтохурский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Shayhontohur tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Мирзо Улугбекский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Mirzo Ulug'bek tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e) 
  }
})
bot.hears("📍Бектемирский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Bektemir tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Чиланзарский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Chilonzor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Яккасарайский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yakkasaroy tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Яшнабадский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yashnobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// toshkent shahar tumanlari

bot.hears("📍Ташкентская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Toshkent viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Бекабадский район" }, { text: "📍Бостанлыкский район" }],
        [{ text: "📍Бокинский район" }, { text: "📍Чинозский район" }],
        [{ text: "📍Охангаронский район" }, { text: "📍Кибрайский район" }],
        [{ text: "📍Аккурганский район" }, { text: "📍Пискентский район" }],
        [{ text: "📍Средний Чирчик" }, { text: "📍Нижний Чирчикский район" }],
        [{ text: "📍Янги Йўлский райoн" }, { text: "📍Верхне Чирчикский район" }],
        [{ text: "📍Паркентский район" },{text: "📍Зангиатинский район"}] ,
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// toshkent viloyati tumanlari
bot.hears("📍Бекабадский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Bekobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Бостанлыкский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Bo'stonliq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Бокинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Bo'ka tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Чинозский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Chinoz tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Охангаронский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Ohangaron tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Кибрайский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qibray tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Аккурганский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Oqqo'rg'on tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Пискентский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Piskent tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Средний Чирчик", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "O'rta Chirchiq" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Нижний Чирчикский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Quyi Chirchiq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Янги Йўлский райoн", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yangi Yo'l" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Верхне Чирчикский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yuqori Chirchiq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Паркентский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Parkent tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Зангиатинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Zangiota tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// toshkent viloyati tumanlari

bot.hears("📍Андижанская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Andijon viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Андижанский район" }, { text: "📍Жалакудукский район" }],
        [{ text: "📍Асакинский район" }, { text: "📍Мархаматский район" }],
        [{ text: "📍Бостонский район" }, { text: "📍Олтынкольский район" }],
        [{ text: "📍Булагбошинский район" }, { text: "📍Пахтаабадский район" }],
        [{ text: "📍Избосканский район" }, { text: "📍Шахриханский район" }],
        [{ text: "📍Ходжаабадский район" }, { text: "📍Улугнорский район" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// Андижанский район viloyati tumanlari
bot.hears("📍Андижанский район", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Andijon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Жалакудукский район", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Jalaquduq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Мархаматский район", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Marhamat tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Асакинский район", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Asaka tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Бостонский район", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Bo'ston tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Олтынкольский район", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Oltinko'l tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Булагбошинский район", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Buloqboshi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Пахтаабадский район", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Paxtaobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Избосканский район", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Izboskan tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Шахриханский район", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Shaxrixon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Ходжаабадский район", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Xo'jaobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Улугнорский район", async (ctx) => {
    try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Ulug'nor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// Андижанский район viloyati tumanlari
bot.hears("📍Наманганская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Namangan viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Чортокский район" }, { text: "📍Мингбулокский район" }],
        [{ text: "📍Чустский район" }, { text: "📍Наманганский район" }],
        [{ text: "📍Косонсойский район" }, { text: "📍город Наманган" }],
        [{ text: "📍Уйчинский район" }, { text: "📍Норинский район" }],
        [{ text: "📍Янгикурганский район" }, { text: "📍Поп район" }],
        [{ text: "📍Учкурганский район" }, { text: "📍Торакурганский район" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// Наманганский район viloyati tumanlari
bot.hears("📍Чортокский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Chortoq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Чустский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Chust tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Мингбулокский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Mingbuloq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Наманганский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Namangan tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Косонсойский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Kosonsoy tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Наманган", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Namangan shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Уйчинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Uychi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Норинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Norin tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Янгикурганский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yangiqo'rg'on tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Поп район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Pop tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Учкурганский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Uchqo'rg'on tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Торакурганский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "To'raqo'rg'on tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// Наманганский район viloyati tumanlari

bot.hears("📍Ферганская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Farg'ona viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Багдадский район" }, { text: "📍Бешарикский район" }],
        [{ text: "📍Дангаринский район" }, { text: "📍Бувайдский район" }],
        [{ text: "📍Ферганский район" }, { text: "📍Фуркатский район" }],
        [{ text: "📍Узбекистанский район" }, { text: "📍Алтыарыкский район" }],
        [{ text: "📍Коштепинский район" }, { text: "📍Кувинский район" }],
        [{ text: "📍Сохский район" }, { text: "📍Риштанский район" }],
        [{ text: "📍Учкоприкский район" }, { text: "📍Тошлокский район" }],
        [{ text: "📍Ёжиовонский район" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// Ферганский район viloyati tumanlari
bot.hears("📍Багдадский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Bag'dod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Бешарикский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Beshariq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Дангаринский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Dang'ara tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Бувайдский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Buvayda tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Ферганский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Farg'ona tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Фуркатский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Furqat tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Узбекистанский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "O'zbekiston tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Алтыарыкский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Oltiariq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Коштепинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qo'shtepa tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Кувинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Quva tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Сохский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "So'x tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Риштанский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Rishton tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Учкоприкский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Uchko'prik tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Тошлокский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Toshloq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Ёжиовонский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yozyovon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// Ферганский район viloyati tumanlari

bot.hears("📍Сырдарьинская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Sirdaryo viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Сырдарьинский район" }, { text: "📍Сайхунабадский район" }],
        [{ text: "📍Гулистанский район" }, { text: "📍Аколтинский район" }],
        [{ text: "📍Бойовутский район" }, { text: "📍Мехнатабадский район" }],
        [{ text: "📍Шароф Рашидов район" }, { text: "📍Мирзаабадский район" }],
        [{ text: "📍Ховосский район" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// Сырдарьинский район viloyati tumanlari
bot.hears("📍Сырдарьинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sirdaryo tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Сайхунабадский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sayxunobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Гулистанский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Guliston tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Аколтинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Oqoltin tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Бойовутский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Boyovut tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Мехнатабадский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Mexnatobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Шароф Рашидов район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sharof Rashidov tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Мирзаабадский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Mirzaobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Ховосский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Hovos tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// Сырдарьинский район viloyati tumanlari

bot.hears("📍Джизакская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Jizzax viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Арнасойский район" }, { text: "📍Мирзачельский район" }],
        [{ text: "📍Бархатный район" }, { text: "📍Пахтакорский район" }],
        [{ text: "📍Дустликский район" }, { text: "📍Янгиабадский район" }],
        [{ text: "📍Форишский район" }, { text: "📍Зарафшанский район" }],
        [{ text: "📍Галлаорольский район" }, { text: "📍Зарбандский район" }],
        [{ text: "📍город Джизак" }, { text: "📍Зоминский район" }],
        [{ text: "📍Джизакский район" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// Джизакский район viloyati tumanlari
bot.hears("📍Арнасойский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Arnasoy tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Мирзачельский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Mirzacho'l tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Бархатный район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Baxmal tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Пахтакорский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Paxtakor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Дустликский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Do'stlik tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Янгиабадский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yangiobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Форишский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Forish tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Зарафшанский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Zarafshon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Галлаорольский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "G'allaorol tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Зарбандский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Zarband tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Джизак", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Jizzax shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Зоминский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Zomin tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Джизакский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Jizzax tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// Джизакский район viloyati tumanlari

bot.hears("📍Самаркандская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Samarqand viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Булунгурский район" }, { text: "📍Иштиханский район" }],
        [{ text: "📍Джомбойский район" }, { text: "📍Каттакурганский район" }],
        [{ text: "📍Нарпайский район" }, { text: "📍Каттакурганский город" }],
        [{ text: "📍Нурабадский район" }, { text: "📍Акдарьинский район" }],
        [{ text: "📍Пахтачинский район" }, { text: "📍Бас Даргомский район" }],
        [{ text: "📍Поярикский район" }, { text: "📍Кошработский район" }],
        [{ text: "📍Тойлокский район" }, { text: "📍Самаркандский район" }],
        [{ text: "📍Ургутский район" }, { text: "📍Самаркандский город" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// Самаркандский район viloyati tumanlari
bot.hears("📍Булунгурский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Bulung'ur tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Иштиханский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Ishtixon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Джомбойский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Jomboy tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Каттакурганский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Kattaqo'rg'on tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Нарпайский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Narpay tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Каттакурганский город", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Kattaqo'rg'on shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Нурабадский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Nurobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Акдарьинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Oqdaryo tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Пахтачинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Paxtachi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Бас Даргомский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Past Darg'om tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Поярикский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Poyariq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Кошработский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qo'shrabot tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Тойлокский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Toyloq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Самаркандский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Samarqand tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Ургутский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Urgut tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Самаркандский город", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Samarqand shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// Самаркандский район viloyati tumanlari

bot.hears("📍Навоийская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Navoiy viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Конимекс район" }, { text: "📍Навбахорский район" }],
        [{ text: "📍Карманинский район" }, { text: "📍Нуратинский район" }],
        [{ text: "📍Томдинский район" }, { text: "📍Учкудукский район" }],
        [{ text: "📍Хатырчинский район" }, { text: "📍Кызылтепинский район" }],
        [{ text: "📍Кызылтепинский город" }, { text: "📍Зарафшанский район" }],
        [{ text: "📍город Навоий" }, { text: "📍Нуратинский город" }],
        [{ text: "📍Конимекс город" }, { text: "📍Учкудукский город" }],
        [{ text: "📍Лангарский город" }, { text: "📍Маликработский город" }],
        [{ text: "📍Тинчликский город" }, { text: "📍город Мурунтов" }],
        [{ text: "📍город Шалкар" }, { text: "📍город Янгиработ" }],
        [{ text: "📍город Газгон" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// город Навоий viloyati tumanlari
bot.hears("📍Конимекс район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Konimex tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Навбахорский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Navbahor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Карманинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Karmana tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Нуратинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Nurota tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Томдинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Tomdi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Учкудукский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Uchquduq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Хатырчинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Xatirchi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Кызылтепинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qiziltepa tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Кызылтепинский город", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qiziltepa shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Зарафшанский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Zarafshon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Навоий", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Navoiy shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Нуратинский город", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Nurota shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Конимекс город", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Konimex shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Учкудукский город", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Uchquduq shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Лангарский город", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Langar shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Маликработский город", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Malikrabot shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Тинчликский город", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Tinchlik shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Мурунтов", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Muruntov shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Шалкар", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Shalqar shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Янгиработ", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yangirabot shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Газгон", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "G'ozg'on shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// город Навоий viloyati tumanlari

bot.hears("📍Кашкадарьинская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Qashqadaryo viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Чиракчинский район" }, { text: "📍Дехканабадский район" }],
        [{ text: "📍Гузорский район" }, { text: "📍Касбинский район" }],
        [{ text: "📍Китабский район" }, { text: "📍Косонский район" }],
        [{ text: "📍Миришкорский район" }, { text: "📍Мубаракский район" }],
        [{ text: "📍Нишанский район" }, { text: "📍Камаши район" }],
        [{ text: "📍Каршинский район" }, { text: "📍город Карши" }],
        [{ text: "📍Шахрисабзский район" }, { text: "📍Яккабогский район" }],
        [{ text: "📍Кокдалинский район" }, { text: "📍Бешкентский район" }],
        [{ text: "📍город Китаб" }, { text: "📍город Косон" }],
        [{ text: "📍Таллимарджонский район" }, { text: "📍город Мубарак" }],
        [{ text: "📍город Шахрисабз" }, { text: "📍город Чиракчи" }],
        [{ text: "📍город Яккабог" }, { text: "📍Янги Нишанский район" }],
        [{ text: "📍город Гузор" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// qashqadaryo viloyati tumanlari
bot.hears("📍Чиракчинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Chiroqchi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Дехканабадский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Dehqonobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Гузорский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "G'uzor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Касбинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Kasbi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Китабский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Kitob tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Косонский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Koson tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Миришкорский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Mirishkor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Мубаракский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Muborak tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Нишанский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Nishon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Камаши район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qamashi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Каршинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qarshi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Карши", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qarshi shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Шахрисабзский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Shahrisabz tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Яккабогский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yakkabog' tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Кокдалинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Ko'kdala tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Бешкентский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Beshkent tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Китаб", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Kitob shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Косон", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Koson shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Таллимарджонский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Tallimarjon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Мубарак", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Muborak shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Шахрисабз", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Shahrisabz shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Чиракчи", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Chiroqchi shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Яккабог", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yakkabog' shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Янги Нишанский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yangi Nishon shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Гузор", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "G'uzor shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// qashqadaryo viloyati tumanlari

bot.hears("📍Сурхандарьинская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Surxondaryo viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Ангорский район" }, { text: "📍Бандиханский район" }],
        [{ text: "📍Байсунский район" }, { text: "📍Деновский район" }],
        [{ text: "📍Джаркурганский район" }, { text: "📍Музработский район" }],
        [{ text: "📍Алтынсойский район" }, { text: "📍Сариосский район" }],
        [{ text: "📍Термезский район" }, { text: "📍Узунский район" }],
        [{ text: "📍Шерабадский район" }, { text: "📍Шорчинский район" }],
        [{ text: "📍Кызырикский район" }, { text: "📍Кумкурганский район" }],
        [{ text: "📍город Байсун" }, { text: "📍город Денов" }],
        [{ text: "📍город Джаркурган" }, { text: "📍город Термез" }],
        [{ text: "📍Шаргунский район" }, { text: "📍город Шерабад" }],
        [{ text: "📍город Кумкурган" }, { text: "📍город Шорчи" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// surxondaryo viloyati tumanlari
bot.hears("📍Ангорский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Angor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Бандиханский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Bandixon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Байсунский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Boysun tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Деновский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Denov tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Джаркурганский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Jarqo'rg'on tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Музработский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Muzrabot tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Алтынсойский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Oltinsoy tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Сариосский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sariosiyo tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Термезский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Termiz tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Узунский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Uzun tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Шерабадский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sherobod tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Шорчинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sho'rchi tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Кызырикский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qiziriq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Кумкурганский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qumqo'rg'on tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Байсун", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Boysun shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Денов", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Denov shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Джаркурган", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Jarqo'rg'on shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Термез", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Termiz shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Шаргунский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sharg'un shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Шерабад", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sherobod shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Кумкурган", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qumqo'rg'on shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Шорчи", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Sho'rchi shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// surxondaryo viloyati tumanlari

bot.hears("📍Бухарская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Buxoro viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Бухарский район" }, { text: "📍город Вобкент" }],
        [{ text: "📍Жондорский район" }, { text: "📍город Когон" }],
        [{ text: "📍Олотский район" }, { text: "📍Пешку район" }],
        [{ text: "📍Ромитанский район" }, { text: "📍Шафирконский район" }],
        [{ text: "📍Каровулбазарский район" }, { text: "📍город Каракол" }],
        [{ text: "📍Гиждуванский район" }, { text: "📍город Бухара" }],
        [{ text: "📍Галаазия район" }, { text: "📍Вобкентский район" }],
        [{ text: "📍Газлинский район" }, { text: "📍Когонский район" }],
        [{ text: "📍город Олот" }, { text: "📍город Ромитан" }],
        [{ text: "📍город Шафиркон" }, { text: "📍Каракольский район" }],
        [{ text: "📍город Каровулбазар" }, { text: "📍город Гиждуван" }],
        [{ text: "📍город Жондор" }, { text: "📍город Зафарабад" }],
        [{ text: "📍город Янгибозор" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// город Бухара viloyarti tumanlari
bot.hears("📍Бухарский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Buxoro tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Вобкент", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Vobkent shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Жондорский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Jondor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Когон", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Kogon shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Олотский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Olot tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Пешку район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Peshku tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Ромитанский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Romitan tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Шафирконский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Shofirkon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Каровулбазарский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qorovulbozor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Каракол", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qorako'l shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Гиждуванский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "G'ijduvon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Бухара", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Buxoro shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Галаазия район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Galaosiyo shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Вобкентский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Vobkent tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Газлинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Gazli shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Когонский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Kogon tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Олот", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Olot shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Ромитан", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Romitan shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Шафиркон", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Shofirkon shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Каракольский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qorako'l tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Каровулбазар", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qorovulbozor shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Гиждуван", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "G'ijduvon shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Жондор", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Jondor shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Зафарабад", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Zafarobod shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Янгибозор", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yangibozor shaharcha" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// город Бухара viloyarti tumanlari

bot.hears("📍Хорезмская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Xorazm viloyati" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "📍Ургенчский район" }, { text: "📍Хазораспский район" }],
        [{ text: "📍Ханкайский район" }, { text: "📍Кошкопирский район" }],
        [{ text: "📍Боготский район" }, { text: "📍Шаватский район" }],
        [{ text: "📍Гурланский район" }, { text: "📍город Хива" }],
        [{ text: "📍город Ургенч" }, { text: "📍Янгарикский район" }],
        [{ text: "📍Янгибозарский район" }, { text: "📍Хивинский район" }],
        [{ text: "📍Тупроккалинский район" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// xorazm viloyati tumanlari
bot.hears("📍Ургенчский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Urganch tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Хазораспский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Hazorasp tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Ханкайский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Xonqa tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Кошкопирский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Qo'shko'pir tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Боготский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Bog'ot tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Шаватский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Shovot tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Гурланский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Gurlan tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Хива", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Xiva shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍город Ургенч", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Urganch shahri" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Янгарикский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yangiariq tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Янгибозарский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Yangibozor tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Хивинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Xiva tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("📍Тупроккалинский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(function (err) {
      const sql = `UPDATE dentists SET district = "Tuproqqal'a tumani" WHERE chat_id = '${ctx.chat.id}'`;
      con.query(sql)
    })
    await ctx.scene.enter('experienceru')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// xorazm viloyati tumanlari

bot.hears("Ташкент", async (ctx) => { 
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вам нужен стоматолог?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Юнусабадский район" }, { text: "Алмазарский район" }],
        [{ text: "Сергелийский район" }, { text: "Шайхонтохурский район" }],
        [{ text: "Яшнабадский район" }, { text: "Мирзо Улугбекский район" }],
        [{ text: "Бектемирский район" }, { text: "Чиланзарский район" }],
        [{ text: "Яккасарайский район" }, { text: "◀️Назад" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})
// toshkent shahar tumanlari
bot.hears("Юнусабадский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yunusobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Алмазарский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Olmazor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Сергелийский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sergeli tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Шайхонтохурский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Shayhontohur tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Мирзо Улугбекский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Mirzo Ulug'bek tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e) 
  }
})
bot.hears("Бектемирский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Bektemir tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Чиланзарский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Chilonzor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Яккасарайский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yakkasaroy tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Яшнабадский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yashnobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// toshkent shahar tumanlari

bot.hears("Ташкентская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Ташкентская область" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Бекабадский район" }, { text: "Бостанлыкский район" }],
        [{ text: "Бокинский район" }, { text: "Чинозский район" }],
        [{ text: "Охангаронский район" }, { text: "Кибрайский район" }],
        [{ text: "Аккурганский район" }, { text: "Пискентский район" }],
        [{ text: "Средний Чирчик" }, { text: "Нижний Чирчикский район" }],
        [{ text: "Янги Йўлский райoн" }, { text: "Верхне Чирчикский район" }],
        [{ text: "Паркентский район" }, { text: "Зангиатинский район" }],
        [{ text: "◀️Назад" }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// toshkent viloyati tumanlari
bot.hears("Бекабадский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Bekobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Бостанлыкский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Bo'stonliq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Бокинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Бокинский район" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Чинозский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Chinoz tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Охангаронский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Ohangaron tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Кибрайский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qibray tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Аккурганский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Oqqo'rg'on tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Пискентский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Piskent tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Средний Чирчик", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "O'rta Chirchiq" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Нижний Чирчикский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Quyi Chirchiq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Янги Йўлский райoн", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yangi Yo'l" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Верхне Чирчикский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yuqori Chirchiq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Паркентский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Parkent tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Зангиатинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Zangiota tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// toshkent viloyati tumanlari

bot.hears("Андижанская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Андижанская область" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Андижанский район" }, { text: "Жалакудукский район" }],
        [{ text: "Асакинский район" }, { text: "Мархаматский район" }],
        [{ text: "Бостонский район" }, { text: "Олтынкольский район" }],
        [{ text: "Булагбошинский район" }, { text: "Пахтаабадский район" }],
        [{ text: "Избосканский район" }, { text: "Шахриханский район" }],
        [{ text: "Ходжаабадский район" }, { text: "Улугнорский район" }],
        [{ text: "◀️Назад" }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// Андижанский район viloyati tumanlari
bot.hears("Андижанский район", async (ctx) => {
    try {
      con.connect(async (err) => {

        const sql = `SELECT * FROM dentists WHERE district = "Andijon tumani" AND accepted = 1`;
        con.query(sql, async (err, result) => {
          
          if (!result.length == 0) {
            for (let i = 0; i < result.length; i++){
              if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
                await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                  caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
                await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
              }
            }
          } else {
            await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
          }
        })
      })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Жалакудукский район", async (ctx) => {
    try {
      con.connect(async (err) => {

        const sql = `SELECT * FROM dentists WHERE district = "Jalaquduq tumani" AND accepted = 1`;
        con.query(sql, async (err, result) => {
          
          if (!result.length == 0) {
            for (let i = 0; i < result.length; i++){
              if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
                await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                  caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
                await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
              }
            }
          } else {
            await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
          }
        })
      })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Мархаматский район", async (ctx) => {
    try {
      con.connect(async (err) => {

        const sql = `SELECT * FROM dentists WHERE district = "Marhamat tumani" AND accepted = 1`;
        con.query(sql, async (err, result) => {
          
          if (!result.length == 0) {
            for (let i = 0; i < result.length; i++){
              if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
                await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                  caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
                await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
              }
            }
          } else {
            await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
          }
        })
      })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Асакинский район", async (ctx) => {
    try {
      con.connect(async (err) => {

        const sql = `SELECT * FROM dentists WHERE district = "Asaka tumani" AND accepted = 1`;
        con.query(sql, async (err, result) => {
          
          if (!result.length == 0) {
            for (let i = 0; i < result.length; i++){
              if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
                await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                  caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
                await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
              }
            }
          } else {
            await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
          }
        })
      })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Бостонский район", async (ctx) => {
    try {
      con.connect(async (err) => {

        const sql = `SELECT * FROM dentists WHERE district = "Bo'ston tumani" AND accepted = 1`;
        con.query(sql, async (err, result) => {
          
          if (!result.length == 0) {
            for (let i = 0; i < result.length; i++){
              if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
                await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                  caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
                await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
              }
            }
          } else {
            await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
          }
        })
      })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Олтынкольский район", async (ctx) => {
    try {
      con.connect(async (err) => {

        const sql = `SELECT * FROM dentists WHERE district = "Oltinko'l tumani" AND accepted = 1`;
        con.query(sql, async (err, result) => {
          
          if (!result.length == 0) {
            for (let i = 0; i < result.length; i++){
              if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
                await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                  caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
                await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
              }
            }
          } else {
            await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
          }
        })
      })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Булагбошинский район", async (ctx) => {
    try {
      con.connect(async (err) => {

        const sql = `SELECT * FROM dentists WHERE district = "Buloqboshi tumani" AND accepted = 1`;
        con.query(sql, async (err, result) => {
          
          if (!result.length == 0) {
            for (let i = 0; i < result.length; i++){
              if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
                await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                  caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
                await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
              }
            }
          } else {
            await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
          }
        })
      })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Пахтаабадский район", async (ctx) => {
    try {
      con.connect(async (err) => {

        const sql = `SELECT * FROM dentists WHERE district = "Paxtaobod tumani" AND accepted = 1`;
        con.query(sql, async (err, result) => {
          
          if (!result.length == 0) {
            for (let i = 0; i < result.length; i++){
              if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
                await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                  caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
                await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
              }
            }
          } else {
            await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
          }
        })
      })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Избосканский район", async (ctx) => {
    try {
      con.connect(async (err) => {

        const sql = `SELECT * FROM dentists WHERE district = "Izboskan tumani" AND accepted = 1`;
        con.query(sql, async (err, result) => {
          
          if (!result.length == 0) {
            for (let i = 0; i < result.length; i++){
              if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
                await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                  caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
                await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
              }
            }
          } else {
            await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
          }
        })
      })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Шахриханский район", async (ctx) => {
    try {
      con.connect(async (err) => {

        const sql = `SELECT * FROM dentists WHERE district = "Shaxrixon tumani" AND accepted = 1`;
        con.query(sql, async (err, result) => {
          
          if (!result.length == 0) {
            for (let i = 0; i < result.length; i++){
              if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
                await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                  caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
                await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
              }
            }
          } else {
            await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
          }
        })
      })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Ходжаабадский район", async (ctx) => {
    try {
      con.connect(async (err) => {

        const sql = `SELECT * FROM dentists WHERE district = "Xo'jaobod tumani" AND accepted = 1`;
        con.query(sql, async (err, result) => {
          
          if (!result.length == 0) {
            for (let i = 0; i < result.length; i++){
              if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
                await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                  caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
                await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
              }
            }
          } else {
            await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
          }
        })
      })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Улугнорский район", async (ctx) => {
    try {
      con.connect(async (err) => {

        const sql = `SELECT * FROM dentists WHERE district = "Ulug'nor tumani" AND accepted = 1`;
        con.query(sql, async (err, result) => {
          
          if (!result.length == 0) {
            for (let i = 0; i < result.length; i++){
              if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
                await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                  caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
                await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
              }
            }
          } else {
            await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
          }
        })
      })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// Андижанский район viloyati tumanlari
bot.hears("Наманганская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Наманганская область" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Чортокский район" }, { text: "Мингбулокский район" }],
        [{ text: "Чустский район" }, { text: "Наманганский район" }],
        [{ text: "Косонсойский район" }, { text: "город Наманган" }],
        [{ text: "Уйчинский район" }, { text: "Норинский район" }],
        [{ text: "Янгикурганский район" }, { text: "Поп район" }],
        [{ text: "Учкурганский район" }, { text: "Торакурганский район" }],
        [{ text: "◀️Назад" }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// Наманганский район viloyati tumanlari
bot.hears("Чортокский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Chortoq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Чустский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Chust tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Мингбулокский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Mingbuloq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Наманганский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Namangan tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Косонсойский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Kosonsoy tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Наманган", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Namangan shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Уйчинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Uychi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Норинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Norin tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Янгикурганский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yangiqo'rg'on tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Поп район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Pop tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Учкурганский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Uchqo'rg'on tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Торакурганский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "To'raqo'rg'on tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// Наманганский район viloyati tumanlari

bot.hears("Ферганская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Ферганская область" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Багдадский район" }, { text: "Бешарикский район" }],
        [{ text: "Дангаринский район" }, { text: "Бувайдский район" }],
        [{ text: "Ферганский район" }, { text: "Фуркатский район" }],
        [{ text: "Узбекистанский район" }, { text: "Алтыарыкский район" }],
        [{ text: "Коштепинский район" }, { text: "Кувинский район" }],
        [{ text: "Сохский район" }, { text: "Риштанский район" }],
        [{ text: "Учкоприкский район" }, { text: "Тошлокский район" }],
        [{ text: "Ёжиовонский район" },{ text: "◀️Назад" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// Ферганский район viloyati tumanlari
bot.hears("Багдадский район", async (ctx) => {
  try {
    con.connect(async (err) => {
      
      let sql = `SELECT * FROM dentists WHERE district = "Bag'dod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Бешарикский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Beshariq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Дангаринский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Dang'ara tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Бувайдский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Buvayda tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Ферганский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Farg'ona tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Фуркатский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Furqat tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Узбекистанский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "O'zbekiston tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Алтыарыкский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Oltiariq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Коштепинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qo'shtepa tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Кувинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Quva tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Сохский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "So'x tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Риштанский район", async (ctx) => {
  try {
    con.connect(() => {

      const sql = `SELECT * FROM dentists WHERE district = "Rishton tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Учкоприкский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Uchko'prik tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Тошлокский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Toshloq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Ёжиовонский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yozyovon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// Ферганский район viloyati tumanlari

bot.hears("Сырдарьинская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Сырдарьинский район" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Сырдарьинский район" }, { text: "Сайхунабадский район" }],
        [{ text: "Гулистанский район" }, { text: "Аколтинский район" }],
        [{ text: "Бойовутский район" }, { text: "Мехнатабадский район" }],
        [{ text: "Шароф Рашидов район" }, { text: "Мирзаабадский район" }],
        [{ text: "Ховосский район" },{ text: "◀️Назад" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// Сырдарьинский район viloyati tumanlari
bot.hears("Сырдарьинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sirdaryo tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Сайхунабадский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sayxunobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Гулистанский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Guliston tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Аколтинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Oqoltin tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Бойовутский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Boyovut tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Мехнатабадский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Mexnatobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Шароф Рашидов район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sharof Rashidov tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Мирзаабадский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Mirzaobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Ховосский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Hovos tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// Сырдарьинский район viloyati tumanlari

bot.hears("Джизакская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Джизакская область" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Арнасойский район" }, { text: "Мирзачельский район" }],
        [{ text: "Бархатный район" }, { text: "Пахтакорский район" }],
        [{ text: "Дустликский район" }, { text: "Янгиабадский район" }],
        [{ text: "Форишский район" }, { text: "Зарафшанский район" }],
        [{ text: "Галлаорольский район" }, { text: "Зарбандский район" }],
        [{ text: "город Джизак" }, { text: "Зоминский район" }],
        [{ text: "Джизакский район" },{ text: "◀️Назад" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// Джизакский район viloyati tumanlari
bot.hears("Арнасойский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Arnasoy tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Мирзачельский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Mirzacho'l tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Бархатный район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Baxmal tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Пахтакорский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Paxtakor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Дустликский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Do'stlik tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Янгиабадский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yangiobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Форишский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Forish tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Зарафшанский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Zarafshon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Галлаорольский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "G'allaorol tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Зарбандский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Zarband tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Джизак", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Jizzax shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Зоминский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Zomin tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Джизакский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Jizzax tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// Джизакский район viloyati tumanlari

bot.hears("Самаркандская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Самаркандская область" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Булунгурский район" }, { text: "Иштиханский район" }],
        [{ text: "Джомбойский район" }, { text: "Каттакурганский район" }],
        [{ text: "Нарпайский район" }, { text: "Каттакурганский город" }],
        [{ text: "Нурабадский район" }, { text: "Акдарьинский район" }],
        [{ text: "Пахтачинский район" }, { text: "Бас Даргомский район" }],
        [{ text: "Поярикский район" }, { text: "Кошработский район" }],
        [{ text: "Тойлокский район" }, { text: "Самаркандский район" }],
        [{ text: "Ургутский район" }, { text: "Самаркандский город" }],
        [{ text: "◀️Назад" }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// Самаркандский район viloyati tumanlari
bot.hears("Булунгурский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Bulung'ur tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Иштиханский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Ishtixon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Джомбойский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Jomboy tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Каттакурганский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Kattaqo'rg'on tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Нарпайский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Narpay tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Каттакурганский город", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Kattaqo'rg'on shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Нурабадский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Nurobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Акдарьинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Oqdaryo tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Пахтачинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Paxtachi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Бас Даргомский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Past Darg'om tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Поярикский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Poyariq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Кошработский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qo'shrabot tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Тойлокский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Toyloq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Самаркандский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Samarqand tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Ургутский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Urgut tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Самаркандский город", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Samarqand shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// Самаркандский район viloyati tumanlari

bot.hears("Навоийская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Навоийская область" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Конимекс район" }, { text: "Навбахорский район" }],
        [{ text: "Карманинский район" }, { text: "Нуратинский район" }],
        [{ text: "Томдинский район" }, { text: "Учкудукский район" }],
        [{ text: "Хатырчинский район" }, { text: "Кызылтепинский район" }],
        [{ text: "Кызылтепинский город" }, { text: "Зарафшанский район" }],
        [{ text: "город Навоий" }, { text: "Нуратинский город" }],
        [{ text: "Конимекс город" }, { text: "Учкудукский город" }],
        [{ text: "Лангарский город" }, { text: "Маликработский город" }],
        [{ text: "Тинчликский город" }, { text: "город Мурунтов" }],
        [{ text: "город Шалкар" }, { text: "город Янгиработ" }],
        [{ text: "город Газгон" },{ text: "◀️Назад" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// город Навоий viloyati tumanlari
bot.hears("Конимекс район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Konimex tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Навбахорский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Navbahor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Карманинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Karmana tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Нуратинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Nurota tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Томдинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Tomdi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Учкудукский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Uchquduq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Хатырчинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Xatirchi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Кызылтепинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qiziltepa tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Кызылтепинский город", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qiziltepa shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Зарафшанский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Zarafshon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Навоий", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Navoiy shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Нуратинский город", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Nurota shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Конимекс город", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Konimex shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Учкудукский город", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Uchquduq shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Лангарский город", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Langar shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Маликработский город", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Malikrabot shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Тинчликский город", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Tinchlik shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Мурунтов", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Muruntov shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Шалкар", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Shalqar shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Янгиработ", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yangirabot shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Газгон", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "G'ozg'on shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// город Навоий viloyati tumanlari

bot.hears("Кашкадарьинская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Кашкадарьинская область" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Чиракчинский район" }, { text: "Дехканабадский район" }],
        [{ text: "Гузорский район" }, { text: "Касбинский район" }],
        [{ text: "Китабский район" }, { text: "Косонский район" }],
        [{ text: "Миришкорский район" }, { text: "Мубаракский район" }],
        [{ text: "Нишанский район" }, { text: "Камаши район" }],
        [{ text: "Каршинский район" }, { text: "город Карши" }],
        [{ text: "Шахрисабзский район" }, { text: "Яккабогский район" }],
        [{ text: "Кокдалинский район" }, { text: "Бешкентский район" }],
        [{ text: "город Китаб" }, { text: "город Косон" }],
        [{ text: "Таллимарджонский район" }, { text: "город Мубарак" }],
        [{ text: "город Шахрисабз" }, { text: "город Чиракчи" }],
        [{ text: "город Яккабог" }, { text: "Янги Нишанский район" }],
        [{ text: "город Гузор" },{ text: "◀️Назад" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// qashqadaryo viloyati tumanlari
bot.hears("Чиракчинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Chiroqchi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Дехканабадский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Dehqonobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Гузорский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "G'uzor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Касбинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Kasbi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Китабский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Kitob tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Косонский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Koson tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Миришкорский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Mirishkor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Мубаракский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Muborak tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Нишанский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Nishon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Камаши район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qamashi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Каршинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qarshi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Карши", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qarshi shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Шахрисабзский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Shahrisabz tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Яккабогский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yakkabog' tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Кокдалинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Ko'kdala tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Бешкентский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Beshkent tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Китаб", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Kitob shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Косон", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Koson shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Таллимарджонский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Tallimarjon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Мубарак", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Muborak shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Шахрисабз", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Shahrisabz shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Чиракчи", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Chiroqchi shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Яккабог", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yakkabog' shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Янги Нишанский район", async (ctx) => {
  try {
    // shu yerdan bazaga tushadi
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yangi Nishon shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Гузор", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "G'uzor shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// qashqadaryo viloyati tumanlari

bot.hears("Сурхандарьинская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Сурхандарьинская область" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Ангорский район" }, { text: "Бандиханский район" }],
        [{ text: "Байсунский район" }, { text: "Деновский район" }],
        [{ text: "Джаркурганский район" }, { text: "Музработский район" }],
        [{ text: "Алтынсойский район" }, { text: "Сариосский район" }],
        [{ text: "Термезский район" }, { text: "Узунский район" }],
        [{ text: "Шерабадский район" }, { text: "Шорчинский район" }],
        [{ text: "Кызырикский район" }, { text: "Кумкурганский район" }],
        [{ text: "город Байсун" }, { text: "город Денов" }],
        [{ text: "город Джаркурган" }, { text: "город Термез" }],
        [{ text: "Шаргунский район" }, { text: "город Шерабад" }],
        [{ text: "город Кумкурган" }, { text: "город Шорчи" }],
        [{ text: "◀️Назад" }]
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// surxondaryo viloyati tumanlari
bot.hears("Ангорский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Angor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Бандиханский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Bandixon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Байсунский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Boysun tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Деновский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Denov tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Джаркурганский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Jarqo'rg'on tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Музработский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Muzrabot tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Алтынсойский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Oltinsoy tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Сариосский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sariosiyo tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Термезский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Termiz tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Узунский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Uzun tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Шерабадский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sherobod tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Шорчинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sho'rchi tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Кызырикский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qiziriq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Кумкурганский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qumqo'rg'on tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Байсун", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Boysun shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Денов", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Denov shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Джаркурган", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Jarqo'rg'on shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Термез", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Termiz shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Шаргунский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sharg'un tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Шерабад", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sherobod shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Кумкурган", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qumqo'rg'on shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Шорчи", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Sho'rchi shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// surxondaryo viloyati tumanlari

bot.hears("Бухарская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Бухарская область" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Бухарский район" }, { text: "город Вобкент" }],
        [{ text: "Жондорский район" }, { text: "город Когон" }],
        [{ text: "Олотский район" }, { text: "Пешку район" }],
        [{ text: "Ромитанский район" }, { text: "Шафирконский район" }],
        [{ text: "Каровулбазарский район" }, { text: "город Каракол" }],
        [{ text: "Гиждуванский район" }, { text: "город Бухара" }],
        [{ text: "Галаазия район" }, { text: "Вобкентский район" }],
        [{ text: "Газлинский район" }, { text: "Когонский район" }],
        [{ text: "город Олот" }, { text: "город Ромитан" }],
        [{ text: "город Шафиркон" }, { text: "Каракольский район" }],
        [{ text: "город Каровулбазар" }, { text: "город Гиждуван" }],
        [{ text: "город Жондор" }, { text: "город Зафарабад" }],
        [{ text: "город Янгибозор" },{ text: "◀️Назад" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// город Бухара viloyarti tumanlari
bot.hears("Бухарский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Buxoro tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Вобкент", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Vobkent shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Жондорский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Jondor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Когон", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Kogon shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Олотский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Olot tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Пешку район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Peshku tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Ромитанский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Romitan tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Шафирконский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Shofirkon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Каровулбазарский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qorovulbozor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Каракол", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qorako'l shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Гиждуванский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "G'ijduvon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Бухара", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Buxoro shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Галаазия район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Galaosiyo shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Вобкентский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Vobkent tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Газлинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Gazli shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Когонский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Kogon tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Олот", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Olot shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Ромитан", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Romitan shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Шафиркон", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Shofirkon shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Каракольский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qorako'l tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Каровулбазар", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qorovulbozor shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Гиждуван", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "G'ijduvon shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Жондор", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Jondor shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Зафарабад", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Zafarobod shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Янгибозор", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yangibozor shaharcha" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// город Бухара viloyarti tumanlari

bot.hears("Хорезмская область", async (ctx) => {
  //shu yerdan bazaga tushadi
  con.connect(function (err) {
    const sql = `UPDATE dentists SET city = "Хорезмская область" WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql)
  })
  await bot.telegram.sendMessage(ctx.chat.id, `В каком районе вы работаете?`, {
    reply_markup: {
      keyboard: [
        [{ text: "Ургенчский район" }, { text: "Хазораспский район" }],
        [{ text: "Ханкайский район" }, { text: "Кошкопирский район" }],
        [{ text: "Боготский район" }, { text: "Шаватский район" }],
        [{ text: "Гурланский район" }, { text: "город Хива" }],
        [{ text: "город Ургенч" }, { text: "Янгарикский район" }],
        [{ text: "Янгибозарский район" }, { text: "Хивинский район" }],
        [{ text: "Тупроккалинский район" },{ text: "◀️Назад" }],
      ],
      one_time_keyboard: true,
      resize_keyboard: true
    }
  })
})

// xorazm viloyati tumanlari
bot.hears("Ургенчский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Urganch tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Хазораспский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Hazorasp tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Ханкайский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Xonqa tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Кошкопирский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Qo'shko'pir tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Боготский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Bog'ot tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Шаватский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Shovot tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Гурланский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Gurlan tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Хива", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Xiva shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("город Ургенч", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Urganch shahri" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Янгарикский район", async (ctx) => {
  try {
    con.connect(async (err) => {
// 
      const sql = `SELECT * FROM dentists WHERE district = "Yangiariq tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Янгибозарский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      const sql = `SELECT * FROM dentists WHERE district = "Yangibozor tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Хивинский район", async (ctx) => {
  try {
    con.connect(async (err) => {
      // 
      const sql = `SELECT * FROM dentists WHERE district = "Xiva tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
bot.hears("Тупроккалинский район", async (ctx) => {
  try {
    con.connect(async (err) => {

      
      const sql = `SELECT * FROM dentists WHERE district = "Tuproqqal'a tumani" AND accepted = 1`;
      con.query(sql, async (err, result) => {
        if (!result.length == 0) {
          for (let i = 0; i < result.length; i++){
            if (result[i]['full_name'] && result[i]['city'] && result[i]['district'] && result[i]['experience'] && result[i]['fee'] && result[i]['phone'] && result[i]['latitude'] && result[i]['longitude'] && result[i]['diploma'] && result[i]['photo']) {
              await bot.telegram.sendPhoto(ctx.chat.id, `${result[i]['photo']}`, { 
                caption: `👨‍⚕️/👩‍⚕️  ${result[i]['full_name']}\n\n🌆 Город: ${result[i]['city']}\n✅ Район: ${result[i]['district']}\n👁 Опыт: ${result[i]['experience']} год(а)\n💵 Плата за лечение: ${result[i]['fee']} сумов\n ☎️ Для контакта:  +${result[i]['phone']}\n📲 Телеграмма:  ${result[i]['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
              await bot.telegram.sendLocation(ctx.chat.id, result[i]['latitude'], result[i]['longitude'])
            }
          }
        } else {
          await ctx.replyWithHTML(`😔 К сожалению, стоматологи из этого района еще не зарегистрированы :(`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})
// xorazm viloyati tumanlari





bot.action("Profilni ko'rish", async (ctx) => {
  await ctx.answerCbQuery()
  con.connect(async (err) => {

    const sql = `SELECT * FROM dentists WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql, async (err, result) => {
      const data = result[0]
      if (!data == 0) {
        if (data['full_name'] && data['city'] && data['district'] && data['experience'] && data['fee'] && data['phone'] && data['latitude'] && data['longitude']) {
          await bot.telegram.sendPhoto(ctx.chat.id, `${data['photo']}`, {caption: `👨‍⚕️/👩‍⚕️ ${data['full_name']}\n\n🌆 Shahar: ${data['city']}\n✅ Tuman: ${data['district']}\n👁 Tajriba: ${data['experience']} yil\n💵 Qabul narxi: ${data['fee']} so'm\n☎️ Murojaat uchun:  +${data['phone']}\n📲 Telegram:  ${data['username']}\n\n❗️ Taklif va shikoyat uchun @Muzaffar_Shoshiy`})
          await bot.telegram.sendLocation(ctx.chat.id, data['latitude'], data['longitude'])}
      } else {
        ctx.replyWithHTML(`🛑 Ma'lumotlaringizda kamchilik bor iltimos ro'yxatdan to'liq o'ting! /register`)
      }
    })
  })
})

bot.action("Просмотреть профиль", async (ctx) => {
  await ctx.answerCbQuery()
  con.connect(async (err) => {

    const sql = `SELECT * FROM dentists WHERE chat_id = '${ctx.chat.id}'`;
    con.query(sql, async (err, result) => {
      const data = result[0]
      if (!data == 0) {
        if (data['full_name'] && data['city'] && data['district'] && data['experience'] && data['fee'] && data['phone'] && data['latitude'] && data['longitude']) {
          await bot.telegram.sendPhoto(ctx.chat.id, `${data['photo']}`, {caption: `👨‍⚕️/👩‍⚕️ ${data['full_name']}\n\n🌆 Город: ${data['city']}\n✅ Район: ${data['district']}\n👁 Опыт: ${data['experience']} год(а)\n💵 Плата за лечение: ${data['fee']} сумов\n☎️ Для контакта:  +${data['phone']}\n📲 Телеграмма:  ${data['username']}\n\n❗️ Для предложений и жалоб - @Muzaffar_Shoshiy`})
          await bot.telegram.sendLocation(ctx.chat.id, data['latitude'], data['longitude'])}
      } else {
        ctx.replyWithHTML(`🛑 Ваша информация неполная, пожалуйста, завершите регистрацию! /register`)
      }
    })
  })
})

bot.command("setname", async (ctx) => {
  try {
    await ctx.scene.enter('setname')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})

bot.command("setpic", async (ctx) => {
  try {
    await ctx.scene.enter('setpic')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})

bot.command("setexperience", async (ctx) => {
  try {
    await ctx.scene.enter('setexperience')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})

bot.command("setprice", async (ctx) => {
  try {
    await ctx.scene.enter('setprice')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})

bot.command("setlocation", async (ctx) => {
  try {
    await ctx.scene.enter('setlocation')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})

bot.command("help", async (ctx) => {
  try {
    await ctx.replyWithHTML(`
/start - \n🇺🇿 Boshlash \n 🇷🇺 Начинать
\n
/setname - \n🇺🇿 F I SH ni o'zgartirish \n🇷🇺 Изменить Ф И О
\n
/setpic - \n🇺🇿 Profil rasmini o'zgartirish \n🇷🇺 Изменить изображение профиля 
\n
/setexperience - \n🇺🇿 Tajribangiz yilini o'zgartirish \n🇷🇺 Измените свой год опыта
\n
/setprice - \n🇺🇿 Qabul narxini o'zgartirish \n🇷🇺 Изменение стоимости приема
\n
/setlocation - \n🇺🇿 Ishxona manzilini o'zgartirish \n🇷🇺 Смена адреса офиса 
\n
/stats - \n🇺🇿 Bot statistikasi \n🇷🇺 Статистика бота 
`)
  } catch (e) {
    console.error("Cant handle start command", e)
  }
})

bot.command("stats", async (ctx)=> {
  try {
    con.connect(async (err) => {

      const sql = `SELECT COUNT(*) FROM users`;
      con.query(sql, async (err, result) => {
        if (result[0]['COUNT(*)']) {
          await ctx.replyWithHTML(`Foydalanuvchilar soni: ${result[0]['COUNT(*)']}`)
        }
      })
    })
  } catch (e) {
    console.log("Something went wrong...",e)
  }
})

bot.command("register", async (ctx) => {
  try {
    await ctx.scene.enter('full_name')
  } catch (e) {
    console.log("Something went wrong...", e)
  }
})

// bot.on("message", async (ctx) => {
//   // console.log(ctx.message.video.file_id)
//   await bot.telegram.sendVideo(ctx.chat.id, `BAACAgIAAxkBAAIi5WM-mdo5r52kfDoJT-ak7iXA8tWwAAKbFwACrk35SdKtC0ujQXixKgQ`)
// })

bot.telegram.setMyCommands([
  {command: "help", description: "Помощь"},
  {command: "start", description: "Начинать"},
  {command: "setname", description: "Изменить Ф И О"},
  {command: "setpic", description: "Изменить изображение профиля"},
  {command: "setexperience", description: "Изменить свой год опыта"},
  {command: "setprice", description: "Изменить стоимости приема"},
  {command: "setlocation", description: "Изменить адреса офиса"},
  {command: "stats", description: "Статистика бота"},
  {command: "doctors", description: "Для администратора"},
]) 

bot.launch().then( async () => {
  console.log(`bot started on @${bot.options.username}`)
})