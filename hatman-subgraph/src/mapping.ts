import { BigInt } from "@graphprotocol/graph-ts"
import {
  Hatman,
  Checked,
  Deposit,
  SetHatCoinAddress,
  Withdraw
} from "../generated/Hatman/Hatman"
import { DepositItem, WithdrawItem, CheckItem } from "../generated/schema"

export function handleDeposit(event: Deposit): void {
  let deposit = new DepositItem(event.params.id.toHex())
  deposit.from = event.params.from
  deposit.amount = event.params.amount
  deposit.timestamp = event.params.timestamp
  deposit.save()
}

export function handleWithdraw(event: Withdraw): void {
  let withdraw = new WithdrawItem(event.params.id.toHex())
  withdraw.to = event.params.to
  withdraw.amount = event.params.amount
  withdraw.timestamp = event.params.timestamp
  withdraw.save() 
}

export function handleChecked(event: Checked): void {
  let check = new CheckItem(event.params.id.toHex())
  check.account = event.params.account
  check.offchainCredits = event.params.offchainCredits
  check.onchainCredits = event.params.onchainCredits
  check.canRun = event.params.canRun
  check.timestamp = event.params.timestamp
  check.save()
}
