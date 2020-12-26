const FAQModel = require('./../models/FAQ');

const FAQService = {};

FAQService.verifyFields = ({ question, answer }) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  if (!question || !answer) {
    serviceResponse = {
      success: false,
      content: {
        error: 'Missing one of the required fields. Request needs an answer and a question.'
      }
    }

    return serviceResponse;
  }

  return serviceResponse;
}

FAQService.create = async ({ question, answer}) => {
  let serviceResponse = {
    success: true,
    content: {}
  }

  const faq = new FAQModel({
    question,
    answer
  });
  try {
    const faqSaved = await faq.save();
    if (!faqSaved) {
      serviceResponse = {
        success: true,
        content: {
          error: 'FAQ could not be saved.'
        }
      };
    } else {
      serviceResponse.content = faqSaved;
    }

    return serviceResponse;
  } catch(error) {
    throw new Error(error);
  }
}

FAQService.findAll = async () => {
  let serviceResponse = {
    success: true,
    content: {}
  }
  try {
    const faqs = await FAQModel.find();
    if (!faqs) {
      serviceResponse = {
        success: false,
        content: {
          error: 'No FAQs found.'
        }
      }
    } else {
      serviceResponse.content = faqs;
    }

    return serviceResponse;
  } catch(error) {
    throw new Error(error);
  }
}

module.exports = FAQService;