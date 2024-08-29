"use client"
import Navbar from '@/components/Navbar'
import React from 'react'
import { useAuthStore } from '@/store/auth'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Command, CheckIcon } from 'lucide-react'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
const Page = () => {

    // const {  } = useAuthStore()
    // console.log("hospitals", hospitals);

    return (
        <>
            <Navbar />

            {/* <div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "w-[200px] justify-between",
                                !field.value && "text-muted-foreground"
                            )}
                        >
                            {field.value
                                ? hospitals.find(
                                    (language) => language.value === field.value
                                )?.label
                                : "Select language"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput
                                placeholder="Search framework..."
                                className="h-9"
                            />
                            <CommandList>
                                <CommandEmpty>No framework found.</CommandEmpty>
                                <CommandGroup>
                                    {hospitals.map((language) => (
                                        <CommandItem
                                            value={language.label}
                                            key={language.value}
                                            onSelect={() => {
                                                form.setValue("language", language.value)
                                            }}
                                        >
                                            {language.label}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    language.value === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div> */}

        </>
    )
}

export default Page