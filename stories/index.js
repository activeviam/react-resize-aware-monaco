import React from 'react';

import { storiesOf } from '@storybook/react';

import MonacoEditor from '../src/MonacoEditor.js';

const stories = storiesOf('Table', module);

stories.add('Monaco Editor', () =>  (
    <div style={{height: 'calc(100vh - 16px)'}}>
        <MonacoEditor 
        theme={{
            key: 'zob',
            base: 'vs-dark', // can also be vs-dark or hc-black
            inherit: true, // can also be false to completely replace the builtin rules
            rules: [{background: '242629', foreground: '9cdcfe'}],
            colors: {
            'editor.background': '#242629',
            'editor.lineHighlightBackground': '#2f3237',
            'editorLineNumber.foreground': '#008800',
            'editor.inactiveSelectionBackground': '#3b3f44',
            'editorLineNumber.foreground': '#60656c'
            },
        }}
        options={{
            language: 'javascript',
            value:`
        /* eslint-disable react/prop-types */
        
        const ACTION_KEY = 'reference-currency-switcher';
        const ACTION_TRANSLATION_PATH = 'reference-currency-switcher';
        
        const {plugins, queries, widgets} = ActiveUI.initialize({
          fetchTranslation(locale, defaultFetchTranslation) {
            return defaultFetchTranslation().then(translation => {
              translation[ACTION_TRANSLATION_PATH] = 'Change reference currency';
              return translation;
            });
          },
        });
        
        queries.serversPool.addActivePivotServer({url: activePivotServerUrl});
        
        const refCurrencies = ['EUR', 'GBP', 'USD'];
        let currentRefCurrencyIndex = 0;
        
        // Register our action plugin, that we will be available from the dock or from a handler on the widget
        plugins.register({
          type: 'action',
          key: ACTION_KEY,
          createProperties() {
            return {
              getCaption() {
                return {textPath: ACTION_TRANSLATION_PATH};
              },
              getIconSrcKey() {
                return 'menuItem.icon.calculate';
              },
              execute(event, {widgetApi}) {
                const nextRefCurrency = refCurrencies[currentRefCurrencyIndex++ % refCurrencies.length];
                widgetApi.getQuery().setContext({referenceCurrency: nextRefCurrency});
                widgetApi.setBookmarkName('My PnL.FOREX in nextRefCurrency');
              },
              isAvailable({widgetApi}) {
                return widgetApi !== undefined;
              },
            };
          },
        });
        
        // We can use our action next to the dock actions from the core by just using their keys
        const tabularDockActions = [ACTION_KEY, 'save', 'save-as', 'clear-dock'];
        const tabularHandlerConfiguration = {
          tabular: {
            handlers: {
              // Defining a the handlers for a specific event key overrides the core implementation. If we want to keep the
              // core actions, we have to copy them.
              contextmenu: [ACTION_KEY, {key: 'query-editor', args: {readOnly: true}}, 'widget-csv-export'],
            },
          },
        };
        
        widgets
          .createTabularView()
          .withName('My PnL.FOREX')
          .withActions(tabularDockActions)
          .withMdx('SELECT [Measures].[pnl.FOREX] ON COLUMNS FROM [EquityDerivativesCube]')
          .withConfiguration(tabularHandlerConfiguration)
          .withTitleBar()
          .notWritable()
          .within('app');
        
        `
        }}/>
    </div>
));
