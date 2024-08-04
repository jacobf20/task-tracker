"use client";
import "@mantine/dates/styles.css"
import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";
import { AppShell, Burger, Group, Title, rem } from "@mantine/core";
import { useState } from "react";
import { Navbar } from "./ui/navbar/Navbar";
import { IconListCheck } from "@tabler/icons-react";
import { ThemeToggle } from "./ui/ThemeToggle";

export default function RootLayout({ children }: { children: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body>
        <MantineProvider theme={theme}>
        <AppShell
            header={{ height: 80 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !isOpen }
            }}
            padding="md"
        >
            <AppShell.Header p="md">
                <Burger
                    opened={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                    hiddenFrom="sm"
                    size="sm"
                />
                <Group justify="space-between">
                    <Group justify="flex-start">
                    <IconListCheck size={40} stroke={2} />
                    <Title>TASK TRACKER</Title>
                    </Group>
                    <ThemeToggle />
                </Group>
                {/* <div><IconListCheck /><Title>TASK TRACKER</Title></div> */}
            </AppShell.Header>

            <AppShell.Navbar><Navbar /></AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
