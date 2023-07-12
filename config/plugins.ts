export default ({ env }) => ({
    // ...
    'users-permissions': {
      config: {
        jwt: {
          expiresIn: '7d',
        },
      },
    },

    'transformer': {
      enabled: true,
      config: {
        responseTransforms: {
          removeAttributesKey: true,
          // removeDataKey: true,
        },
      }
    },

    // ...
  });
