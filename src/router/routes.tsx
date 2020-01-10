import React, { lazy } from 'react';

type OneOfPageName = typeof PAGE_NAMES[number];
const PAGE_NAMES = ['index', 'series', 'book'] as const;

const create = (name: OneOfPageName) => {
  return lazy(() => import(/* webpackChunkName: "[request]" */ `../containers/${name}.tsx`));
};

const pages = PAGE_NAMES.reduce<Record<string, React.LazyExoticComponent<React.ComponentType<unknown>>>>(
  (acc, name) => {
    acc[name] = create(name);
    return acc;
  },
  {},
) as Record<OneOfPageName, React.LazyExoticComponent<React.ComponentType<unknown>>>;

export default pages;
