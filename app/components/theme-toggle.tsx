import { LaptopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import React from 'react';
import { useHydrated } from 'remix-utils/use-hydrated';

import {
  getTheme,
  setTheme as setSystemTheme,
} from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const THEME_OPTIONS = ['light', 'dark', 'system'] as const;
type ThemeOption = (typeof THEME_OPTIONS)[number];

export function ThemeToggle() {
  const hydrated = useHydrated();
  const [theme, setThemeState] = React.useState<ThemeOption>('system');

  React.useEffect(() => {
    if (hydrated) {
      const currentTheme = getTheme() as ThemeOption;
      setThemeState(currentTheme);
    }
  }, [hydrated]);

  const setTheme = (newTheme: ThemeOption) => {
    setSystemTheme(newTheme);
    setThemeState(newTheme);
  };

  return (
    <div className="flex items-center space-x-4 mx-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="border-2">
          <Button className="w-9 h-9 rounded-full" size="icon" variant="ghost">
            <span className="sr-only">Theme selector</span>
            {!hydrated ? null : theme === 'dark' ? (
              <MoonIcon className="text-brandGold hover:text-background" />
            ) : theme === 'light' ? (
              <SunIcon className="text-brandGold hover:text-background" />
            ) : (
              <LaptopIcon className="text-brandGold hover:text-background" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-2">
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={theme}
            onValueChange={value => setTheme(value as ThemeOption)}
          >
            {THEME_OPTIONS.map(themeOption => (
              <DropdownMenuRadioItem
                key={themeOption}
                value={themeOption}
                className="w-full text-left cursor-pointer"
              >
                {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
