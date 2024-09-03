"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  id: z.number(),
  date: z.string().min(1),
  home_team_id: z.number(),
  home_score: z.number(),
  visiting_team_id: z.number(),
  visiting_score: z.number(),
  round: z.number(),
});

export default function Create(props: {
  teamList: ITeam[];
  id: number;
  submitSuccess: () => void;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: props.id,
      date: "",
      home_team_id: 0,
      home_score: 0,
      visiting_team_id: 0,
      visiting_score: 0,
      round: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
    await fetch("/api/schedule", {
      method: "PUT",
      body: JSON.stringify(values),
    });
    setOpen(false);
    props.submitSuccess();
  };

  const showDialog = async () => {
    const res = await fetch(`/api/schedule?id=${props.id}`, {
      method: "GET",
    });
    const data = await res.json();
    form.reset({
      id: data.id,
      date: data.date,
      home_team_id: data.home_team_id,
      home_score: data.home_score,
      visiting_team_id: data.visiting_team_id,
      visiting_score: data.visiting_score,
      round: data.round,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={showDialog}>
          编辑
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>编辑赛程</DialogTitle>
            </DialogHeader>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>日期</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="请输入日期" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="home_team_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>主队</FormLabel>
                  <FormControl>
                    <Select
                      value={"" + field.value}
                      onValueChange={(e) => field.onChange(parseInt(e, 10))}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="请选择" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {props.teamList.map((team) => (
                          <SelectItem key={team.id} value={"" + team.id}>
                            {team.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="home_score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>主队得分</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="visiting_team_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>客队</FormLabel>
                  <FormControl>
                    <Select
                      value={"" + field.value}
                      onValueChange={(e) => field.onChange(parseInt(e, 10))}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="请选择" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {props.teamList.map((team) => (
                          <SelectItem key={team.id} value={"" + team.id}>
                            {team.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="visiting_score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>客队得分</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="round"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>轮次</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  取消
                </Button>
              </DialogClose>
              <Button type="submit">保存</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
