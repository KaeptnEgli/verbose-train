import LedgerLiveApi from "@ledgerhq/live-app-sdk";
import { WindowMessageTransport } from "@ledgerhq/live-app-sdk";
import * as React from "react";
import * as ReactDOM from 'react-dom';
import { StyleProvider } from "@ledgerhq/react-ui";
import { Switch, ProgressBar, Text, Flex, Logos } from "@ledgerhq/react-ui";
import { Stepper, Step } from 'react-form-stepper';
import styled from 'styled-components';
import { color } from 'styled-system';
import BityApp from './BityApp';

const domContainer = document.querySelector('#reactBox');

ReactDOM.render(
  <React.StrictMode>
    <BityApp />
  </React.StrictMode>,
  domContainer,
);

const llapi = new LedgerLiveApi(new WindowMessageTransport());
llapi.connect();
