import { AnimatePresence, motion } from 'motion/react'

import { fadeInUp } from '@/utils/motion.utils'

import { FadeInView } from '@/components/ui/animated-container'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { LANDING_HOW_IT_WORKS } from '@/constants/landing.constants'

function LandingHowItWorks() {
  const tabKeys = Object.keys(LANDING_HOW_IT_WORKS)

  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Section header */}
        <motion.div className="mb-16 text-center md:mb-20" {...fadeInUp}>
          <span className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
            Simple process
          </span>
          <h2 className="text-display-section text-foreground mt-4">Get started in minutes</h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-lg">
            Whether you&apos;re a brand, agency, or creator — the workflow is simple.
          </p>
        </motion.div>

        <FadeInView className="mx-auto max-w-4xl">
          <Tabs defaultValue={tabKeys[0]}>
            <div className="mb-12 flex justify-center">
              <TabsList variant="line">
                {tabKeys.map((key) => (
                  <TabsTrigger key={key} value={key}>
                    {LANDING_HOW_IT_WORKS[key].label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              {tabKeys.map((key) => (
                <TabsContent key={key} value={key}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col"
                  >
                    {LANDING_HOW_IT_WORKS[key].steps.map((step, index) => (
                      <div key={step.title}>
                        <div className="flex gap-6 py-8 md:gap-10">
                          {/* Step number */}
                          <span className="text-muted-foreground/20 font-display shrink-0 text-5xl md:text-6xl">
                            {index + 1}
                          </span>
                          {/* Content */}
                          <div className="flex flex-col gap-2 pt-2">
                            <h3 className="font-display text-lg md:text-xl">{step.title}</h3>
                            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                        {index < LANDING_HOW_IT_WORKS[key].steps.length - 1 && <Separator />}
                      </div>
                    ))}
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </FadeInView>
      </div>
    </section>
  )
}

export { LandingHowItWorks }
