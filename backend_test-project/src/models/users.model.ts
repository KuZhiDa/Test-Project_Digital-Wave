import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'users' })
export class Users {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'varchar', length: 15, unique: true })
	login: string

	@Column({ type: 'varchar', length: 320, unique: true })
	email: string

	@Column({ type: 'varchar', length: 60 })
	password: string

	@Column({ type: 'varchar', length: 15, unique: true })
	username: string

	@CreateDateColumn()
	date_reg: Date
}
