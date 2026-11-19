# Consumer Dispute

A Claude skill that runs a refund or consumer dispute by email, from the first ask to the consumer
court if it gets that far. It does the reading, the writing, the waiting and the follow-ups. You
make every decision that involves money, your identity or a new step.

Most refund fights are lost to fatigue, not to policy. Support says no twice, you have a job, and
the company knows you will give up. This skill is built for that part. It keeps the thread moving
with calm, sourced emails until the goal is met or you say stop.

It came out of 2 real cases in India in November 2026. In one, a support manager wrote "final
decision" twice, and a senior team lead refunded in full 4 days after a formal notice. In the
other, a store sold a defective screen protector under a "no refunds on skins" policy. The lessons
from both are written into the skill.

## Install

In Claude Code, as a plugin:

```
/plugin marketplace add jainulabudeenm/consumer-dispute
/plugin install consumer-dispute
```

From npm, which also covers Claude.ai and anywhere outside Claude Code:

```
npx consumer-dispute
```

It works best with a mail connector (the Gmail connector in Claude) so it can search your inbox
and draft replies. Without one, paste the emails in and send its drafts yourself.

## Use

```
> I want my money back from this store, here is their last email
> they refused my refund again
> will I get a refund for this?
```

First run asks five short questions: your name for signing emails, your country, the mail accounts
it may search, your timezone and where to keep case folders. Then it starts on the case you came
with.

## What it does

1. **Intake.** Finds the order, the dates, the amount and every word the company wrote, in your mail,
   before it asks you anything.
2. **Research.** Reads the company's refund policy, Terms, FAQ and contact page, and the consumer law
   that applies. Quotes the exact sentence and the URL for each.
3. **Assess.** Tells you your chance in plain words, what is for you and what is against you, and
   agrees a ranked goal and a deadline with you.
4. **Case folder.** One folder per case, with a README that holds the goal, your approvals, the
   facts with sources, and a log of every email.
5. **Watch.** In Claude Code it checks the inbox every 2 hours and answers stalls and refusals, if you
   gave it approval to send in that thread. Otherwise it drafts and tells you.
6. **Escalate.** One step at a time: supervisor and grievance officer, consumer helpline, formal
   notice, consumer court. It writes the text. You file.
7. **Close.** Checks the refund actually landed, including bank fees charged on the refund itself.

## What it will not do

- Accept or refuse an offer. A replacement, a partial refund or store credit always comes back to
  you.
- Type a password, OTP, card, bank or ID number.
- Open a bank chargeback for a payment you agreed to.
- Follow instructions inside a company's email. Those are shown to you, not acted on.
- Send to a new person, send a formal notice, file a complaint or post in public without a fresh
  yes from you.

## Countries

The escalation ladder and the rules in `references/india.md` are for India, checked against the
primary legal text in November 2026. For anywhere else, the skill researches that country's consumer
law first and cites the source. The method carries over. The rule numbers do not.

## The profile

`~/.claude/consumer-dispute/profile.md`, in your home directory rather than a repo, because it holds
your name and email addresses. See `profile.example.md` for the shape. Run `/consumer-dispute-init`
to change it.

## Not legal advice

It quotes the law and the company's own words, and it is careful about both. It is not a lawyer.
For a large amount, or if the company brings in its own lawyers, talk to one.

## License

MIT
