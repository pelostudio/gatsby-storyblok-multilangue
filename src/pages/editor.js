import React, {useEffect, useState} from 'react';

import config from '../../gatsby-config';
import Storyblok from '../templates/page';

const storyblokConfig = config.plugins.find((item) => item.resolve === 'gatsby-source-storyblok');
const apiKey = storyblokConfig ? storyblokConfig.options?.accessToken : '';
const relations = storyblokConfig ? storyblokConfig.options?.resolveRelations : [];

function getPath() {
  let path = '';

  window.location.search
    .substring(1)
    .split('&')
    .forEach((item) => {
      let parameter = item.split('=');
      if (parameter[0] === 'path') {
        path = decodeURIComponent(parameter[1]);
      }
    });

  return path;
}

function loadStoryblokBridge(callback) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = `//app.storyblok.com/f/storyblok-latest.js?t=${apiKey}`;
  script.onload = callback;
  document.getElementsByTagName('head')[0].appendChild(script);
}

const Page = () => {
  const [story, setStory] = useState(null);

  function initStoryblokEvents() {
    const { StoryblokBridge } = window
    
    loadStory();

    let sb = window.storyblok;

    sb.on(['change', 'published'], () => {
      loadStory();
    });

    sb.on('input', (payload) => {
      sb.addComments(payload.story.content, payload.story.id);
      resolveRelations(payload.story, setStory);
    });

    sb.pingEditor(() => {
      if (sb.inEditor) {
        sb.enterEditmode();
      }
    });
  }

  function loadStory() {
    window.storyblok.get(
      {
        slug: getPath(),
        version: 'draft',
      },
      ({story}) => {
        setStory(story)
        // resolveRelations(story, setStory);
      }
    );
  }

  function resolveRelations(story, callback) {
    window.storyblok.resolveRelations(story, relations, () => {
      callback(story);
    });
  }

  useEffect(() => {
    loadStoryblokBridge(initStoryblokEvents);
  }, []);

  

  if (story === null) return null;

  return <Storyblok pageContext={{story}} />;
};

export default Page;
