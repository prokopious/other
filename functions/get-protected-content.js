const content = {
  free: {
    src:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWQYZUhGywv9VahxsIzmlZ3q6gdgV-nPokxg&usqp=CAU',

    alt: 'corgi in the park with a sunset in the background',
    credit: 'Jacob Van Blarcom',
    creditLink: 'https://unsplash.com/photos/lkzjENdWgd8',
    message: 'To view this content, you need to create an account!',
    allowedRoles: ['free', 'pro', 'premium'],
  },

  free:  [
    { "name": "Apple", "src": "/images/apple.jpg" },
    { "name": "Apple2", "src": "/images/apple2.jpg" },
    { "name": "Apple3", "src": "/images/apple3.jpg" },
    { "name": "Apple4", "src": "/images/apple4.jpg" },
    { "name": "Apple5", "src": "/images/apple5.jpg" },
    { "name": "Apple6", "src": "/images/apple6.jpg" },
    { "name": "Bagels", "src": "/images/bagels.jpg" },
    { "name": "Single bagel", "src": "/images/single-bagel.jpg" },
    { "name": "Carrots", "src": "/images/carrots.jpg" },
    { "name": "Latte art", "src": "/images/latte-art.jpg" },
    { "name": "Noodles", "src": "/images/noodles.jpg" },
    { "name": "Branches", "src": "/images/branches.png" }
],

  pro: {
    src:
      'https://images.unsplash.com/photo-1519098901909-b1553a1190af?auto=format&fit=crop&w=600&h=600&q=80',
    alt: 'close-up of a corgi with its tongue hanging out',
    credit: 'Florencia Potter',
    creditLink: 'https://unsplash.com/photos/yxmNWxi3wCo',
    message:
      'This is protected content! It’s only available if you have a pro plan or higher.',
    allowedRoles: ['free','pro', 'premium'],
  },
  premium: {
    src:
      'https://images.unsplash.com/photo-1546975490-e8b92a360b24?auto=format&fit=crop&w=600&h=600&q=80',
    alt: 'corgi in a tent with string lights in the foreground',
    credit: 'Cole Keister',
    creditLink: 'https://unsplash.com/photos/cX-KEISwDIw',
    message:
      'This is protected content! It’s only available if you have the premium plan.',
    allowedRoles: ['premium'],
  },
};

exports.handler = async (event, context) => {
  const { type } = JSON.parse(event.body);
  const { user } = context.clientContext;
  const roles = user ? user.app_metadata.roles : false;
  const { allowedRoles } = content[type];

  if (!roles || !roles.some((role) => allowedRoles.includes(role))) {
    return {
      statusCode: 402,
      body: JSON.stringify({
        src:
          'https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto/v1592618179/stripe-subscription/subscription-required.jpg',
        alt: 'corgi in a crossed circle with the text “subscription required”',
        credit: 'Jason Lengstorf',
        creditLink: 'https://dribbble.com/jlengstorf',
        message: `This content requires a ${type} subscription.`,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(content[type]),
  };
};
